import { useState, useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 300;

/**
 * Generates the frame URL for a given index (1-based).
 * Frames are in /frames/001.png ... /frames/300.png
 */
export function getFrameUrl(index) {
  const padded = String(index).padStart(3, '0');
  return `/frames/ezgif-frame-${padded}.jpg`;
}

/**
 * Preloads all frames and reports progress.
 * Returns { images, progress, isLoaded }
 */
export function useFramePreloader(totalFrames = TOTAL_FRAMES) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef([]);

  useEffect(() => {
    let loaded = 0;
    const images = new Array(totalFrames);
    imagesRef.current = images;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i + 1);

      img.onload = () => {
        loaded++;
        setProgress(Math.round((loaded / totalFrames) * 100));
        if (loaded === totalFrames) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        // Count errored frames too, so we don't stall
        loaded++;
        setProgress(Math.round((loaded / totalFrames) * 100));
        if (loaded === totalFrames) {
          setIsLoaded(true);
        }
      };

      images[i] = img;
    }
  }, [totalFrames]);

  return { images: imagesRef, progress, isLoaded };
}

/**
 * Draws a frame onto a canvas element, covering the full canvas
 * while preserving aspect ratio (object-fit: cover behaviour).
 */
export function drawFrameOnCanvas(canvas, img) {
  if (!canvas || !img || !img.naturalWidth) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const cw = canvas.width;
  const ch = canvas.height;

  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  const scale = Math.max(cw / (iw * dpr), ch / (ih * dpr));

  const drawW = iw * scale;
  const drawH = ih * scale;

  const offsetX = (cw / dpr - drawW) / 2;
  const offsetY = (ch / dpr - drawH) / 2;

  ctx.clearRect(0, 0, cw / dpr, ch / dpr);
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

/**
 * Resizes a canvas element, accounting for device pixel ratio.
 */
export function useCanvasResize(canvasRef) {
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const { clientWidth, clientHeight } = canvas;

    canvas.width  = clientWidth  * dpr;
    canvas.height = clientHeight * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
  }, [canvasRef]);

  useEffect(() => {
    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    const canvas = canvasRef.current;
    if (canvas) observer.observe(canvas);

    return () => observer.disconnect();
  }, [resizeCanvas, canvasRef]);

  return resizeCanvas;
}

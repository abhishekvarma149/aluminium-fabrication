import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroAnimation() {
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);
  const overlayRef = useRef(null);
  const endTextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  /* ─── Wait for video metadata ─── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setIsReady(true);

    // Already has metadata (e.g. cached)
    if (video.readyState >= 1) {
      onReady();
    } else {
      video.addEventListener('loadedmetadata', onReady, { once: true });
    }

    return () => video.removeEventListener('loadedmetadata', onReady);
  }, []);

  /* ─── GSAP ScrollTrigger ─── */
  useLayoutEffect(() => {
    if (!isReady) return;

    const video   = videoRef.current;
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const endText = endTextRef.current;
    if (!video || !section || !overlay || !endText) return;

    video.pause();

    const duration = video.duration;

    // Use gsap.context() for clean React-compatible teardown
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=3000',
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate(self) {
          video.currentTime = Math.min(
            Math.max(self.progress * duration, 0),
            duration
          );
          overlay.style.opacity = String(
            Math.max(0, 1 - self.progress / 0.3)
          );
          
          // Animate the end text as the video finishes (progress 0.7 to 1.0)
          const p = Math.max(0, (self.progress - 0.7) / 0.3);
          endText.style.opacity = p;
          endText.style.transform = `translate(-50%, -50%) scale(${1.2 - 0.2 * p})`;
          endText.style.filter = `blur(${(1 - p) * 15}px)`;
        },
      });
    }, sectionRef); // scope to sectionRef

    return () => ctx.revert(); // cleanly removes pin wrapper + kills ST
  }, [isReady]);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      aria-label="Hero — scroll-driven animation"
    >
      <video
        ref={videoRef}
        className="hero-canvas"
        muted
        playsInline
        autoPlay
        webkit-playsinline="true"
        preload="auto"
        aria-hidden="true"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src="/window.mp4" type="video/mp4" />
      </video>

      <div ref={overlayRef} className="hero-overlay">
        <p className="hero-eyebrow">Redefining Luxury</p>

        <h1 className="hero-title">
          Experience<br />Modern Living
        </h1>

        <p className="hero-subtitle">
          Luxury spaces designed for comfort, elegance, and innovation.
        </p>

        <button
          id="hero-cta-btn"
          className="hero-cta"
          onClick={() =>
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Explore More
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div ref={endTextRef} className="hero-end-text">
        <h2 className="hero-end-title">Welcome Home</h2>
        <p className="hero-end-subtitle">A New Standard of Excellence</p>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

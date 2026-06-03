/**
 * Loading overlay — shown while frames are being preloaded.
 * Fades out once isLoaded is true.
 */
export default function LoadingOverlay({ progress, isLoaded }) {
  return (
    <div
      className={`loading-overlay${isLoaded ? ' hidden' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading: ${progress}%`}
    >
      <div className="loading-logo">
        Alumi<span>nium</span>
      </div>

      <div className="loading-bar-track" aria-hidden="true">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="loading-percent">{progress}%</p>
    </div>
  );
}

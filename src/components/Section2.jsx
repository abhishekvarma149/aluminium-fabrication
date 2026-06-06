import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 2 – Text left, large image right.
 */
export default function Section2() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const textRef    = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image   = imageRef.current;
    const text    = textRef.current;
    if (!section || !image || !text) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* Fade-up and slide-in for all screen sizes */
      mm.add("all", () => {
        gsap.from(text.querySelectorAll('.fade-up'), {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            once: true,
          },
        });

        /* Slide in from right */
        gsap.from(image.parentElement, {
          xPercent: 5,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
        });
      });

      /* Parallax - desktop only */
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          image,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="design"
      className="section section-split reverse"
      style={{ background: 'var(--color-surface)' }}
      aria-labelledby="s2-title"
    >
      {/* Text */}
      <div ref={textRef} className="split-content">
        <p className="content-eyebrow fade-up">Materials &amp; Craft</p>
        <div className="divider fade-up" aria-hidden="true" />
        <h2 id="s2-title" className="content-title fade-up">
          Precision Refined<br />to Perfection
        </h2>
        <p className="content-body fade-up">
          We source only the most exceptional materials — hand-selected stone,
          reclaimed oak, brushed aluminium — because a home of true distinction
          deserves nothing less than the extraordinary.
        </p>
        <p className="content-body fade-up" style={{ marginTop: '-0.5rem' }}>
          Our craftsmen work with obsessive attention to detail, ensuring
          every joint, every surface, every shadow speaks of mastery.
        </p>

        <div className="content-stat-row fade-up">
          <div className="content-stat">
            <strong>100%</strong>
            <span>Sustainable</span>
          </div>
          <div className="content-stat">
            <strong>60+</strong>
            <span>Material choices</span>
          </div>
        </div>

        <a href="#showcase" className="content-link fade-up">
          View materials
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Image */}
      <div className="split-image-wrap">
        <img
          ref={imageRef}
          src="/frames/ezgif-frame-150.jpg"
          alt="Aluminium premium material detail"
          loading="lazy"
          decoding="async"
        />
        <div className="split-image-overlay" aria-hidden="true" />
      </div>
    </section>
  );
}

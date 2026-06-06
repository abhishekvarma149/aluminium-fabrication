import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 1 – Large image left, text + stats right.
 */
export default function Section1() {
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

      /* Fade-up items inside text block - run on all screen sizes */
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

        /* Slide in from left */
        gsap.from(image.parentElement, {
          xPercent: -5,
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

      /* Subtle parallax on image - desktop only to save performance */
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
      id="about"
      className="section section-split"
      aria-labelledby="s1-title"
    >
      {/* Image */}
      <div className="split-image-wrap">
        <img
          ref={imageRef}
          src="/frames/ezgif-frame-050.jpg"
          alt="A stunning architectural interior with warm light"
          loading="lazy"
          decoding="async"
        />
        <div className="split-image-overlay" aria-hidden="true" />
      </div>

      {/* Text */}
      <div ref={textRef} className="split-content">
        <p className="content-eyebrow fade-up">Our Philosophy</p>
        <div className="divider fade-up" aria-hidden="true" />
        <h2 id="s1-title" className="content-title fade-up">
          Where Architecture<br />Meets Artistry
        </h2>
        <p className="content-body fade-up">
          Every space we create is a conversation between structure and soul.
          We craft environments where clean lines dissolve into warmth,
          and every material choice tells a story of intentional luxury.
        </p>

        <div className="content-stat-row fade-up">
          <div className="content-stat">
            <strong>240+</strong>
            <span>Projects</span>
          </div>
          <div className="content-stat">
            <strong>18</strong>
            <span>Countries</span>
          </div>
          <div className="content-stat">
            <strong>12×</strong>
            <span>Award winning</span>
          </div>
        </div>

        <a href="#design" className="content-link fade-up">
          Our approach
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}

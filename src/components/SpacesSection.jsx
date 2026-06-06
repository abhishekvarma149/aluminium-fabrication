import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPACES = [
  {
    id: 'bathroom',
    title: 'Bathroom',
    desc: 'A sanctuary of serenity. Sleek lines, elegant surfaces, and an ambiance of pure relaxation.',
    image: '/spaces/bathroom.png'
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
    desc: 'Where form meets function. A culinary masterpiece with cutting-edge design and premium finishes.',
    image: '/spaces/kitchen.png'
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    desc: 'An oasis of calm. Luxurious textures, warm lighting, and uninterrupted views for restful nights.',
    image: '/spaces/bedroom.png'
  },
  {
    id: 'living_room',
    title: 'Living Room',
    desc: 'The heart of the home. Expansive, inviting, and flawlessly designed for gathering and unwinding.',
    image: '/spaces/living_room.png'
  },
  {
    id: 'study_room',
    title: 'Study Room',
    desc: 'Focused, refined, built for ideas and clarity. A space designed to inspire your greatest work.',
    image: '/spaces/study_room.png'
  }
];

export default function SpacesSection() {
  const [activeId, setActiveId] = useState(SPACES[4].id); // default to Study Room as in reference
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Fade-ins for all screens
      mm.add("all", () => {
        gsap.from('.spaces-main-title', {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        });
        gsap.from('.spaces-tabs-wrapper', {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        });
      });

      // Heavy clipPath animation only on desktop
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          section,
          { clipPath: 'inset(15% 10% 0% 10% round 40px 40px 0 0)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.5,
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animations when activeId changes
  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      gsap.fromTo(
        card,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [activeId]);

  return (
    <section ref={sectionRef} id="spaces" className="spaces-section">
      {/* Background Images */}
      {SPACES.map((space) => (
        <div
          key={space.id}
          className={`spaces-bg ${activeId === space.id ? 'active' : ''}`}
          style={{ backgroundImage: `url(${space.image})` }}
        />
      ))}
      <div className="spaces-overlay" />

      <div className="spaces-content-layout">
        {/* Main Title */}
        <h2 className="spaces-main-title">
          Transforming<br />Spaces
        </h2>

        {/* Content Card (Bottom Left) */}
        <div ref={cardRef} className="spaces-card">
          <h3 className="spaces-card-title">
            {SPACES.find(s => s.id === activeId)?.title}
          </h3>
          <p className="spaces-card-desc">
            {SPACES.find(s => s.id === activeId)?.desc}
          </p>
          <button className="spaces-card-btn">
            Explore
          </button>
        </div>

        {/* Tabs (Bottom Right) */}
        <div className="spaces-tabs-wrapper">
          {SPACES.map((space) => (
            <button
              key={space.id}
              className={`spaces-tab ${activeId === space.id ? 'active' : ''}`}
              onClick={() => setActiveId(space.id)}
            >
              {space.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

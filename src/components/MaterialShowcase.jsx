import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MATERIALS = {
  upvc: {
    title: 'uPVC',
    description: 'uPVC stands for unplasticized Polyvinyl Chloride—a durable, low-maintenance material commonly used for modern window and door frames.',
    products: [
      { id: 'u1', name: 'uPVC Fixed Window', image: '/windows/upvc_fixed.png', link: '#' },
      { id: 'u2', name: 'uPVC Sliding Window', image: '/windows/upvc_fixed.png', link: '#' },
      { id: 'u3', name: 'uPVC Casement Window', image: '/windows/upvc_fixed.png', link: '#' },
      { id: 'u4', name: 'uPVC Tilt & Turn Window', image: '/windows/upvc_tilt_turn.png', link: '#' },
      { id: 'u5', name: 'uPVC French Window', image: '/windows/upvc_fixed.png', link: '#' },
      { id: 'u6', name: 'uPVC Bay Window', image: '/windows/upvc_fixed.png', link: '#' },
      { id: 'u7', name: 'uPVC Corner Window', image: '/windows/upvc_fixed.png', link: '#' },
      { id: 'u8', name: 'uPVC Picture Window', image: '/windows/upvc_fixed.png', link: '#' },
      { id: 'u9', name: 'uPVC Awning Window', image: '/windows/upvc_fixed.png', link: '#' },
      { id: 'u10', name: 'uPVC Bi-Fold Window', image: '/windows/upvc_fixed.png', link: '#' },
      { id: 'u11', name: 'uPVC Lift & Slide Window', image: '/windows/upvc_fixed.png', link: '#' },
      { id: 'u12', name: 'uPVC Glass-to-Glass Joint Window', image: '/windows/upvc_glass_joint.png', link: '#' },
    ]
  },
  aluminium: {
    title: 'Aluminium',
    description: 'Aluminium is incredibly strong, allowing for ultra-slim frames and maximum glass areas, perfect for contemporary luxury living.',
    products: [
      { id: 'a1', name: 'Aluminium Sliding Window', image: '/windows/alu_sliding.png', link: '#' },
      { id: 'a2', name: 'Aluminium Casement Window', image: '/windows/alu_casement.png', link: '#' },
      { id: 'a3', name: 'Aluminium Slimline Window', image: '/windows/alu_slimline.png', link: '#' },
    ]
  }
};

export default function MaterialShowcase() {
  const [activeMaterial, setActiveMaterial] = useState('upvc');
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Initial scroll animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("all", () => {
        gsap.from('.ms-fade-up', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card switch animations
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Reset scroll position when switching tabs
    grid.scrollTo({ left: 0, behavior: 'smooth' });

    const cards = grid.querySelectorAll('.ms-card-wrapper');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.05 }
    );
  }, [activeMaterial]);

  const slideNext = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const slidePrev = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const currentData = MATERIALS[activeMaterial];

  return (
    <section ref={sectionRef} id="materials" className="material-showcase section">
      <div className="ms-container">
        
        {/* Toggle Header */}
        <div className="ms-header ms-fade-up">
          <div className="ms-toggle">
            <button
              className={`ms-toggle-btn ${activeMaterial === 'upvc' ? 'active' : ''}`}
              onClick={() => setActiveMaterial('upvc')}
            >
              uPVC
            </button>
            <button
              className={`ms-toggle-btn ${activeMaterial === 'aluminium' ? 'active' : ''}`}
              onClick={() => setActiveMaterial('aluminium')}
            >
              Aluminium
            </button>
          </div>
          
          <div className="ms-header-bottom">
            <p className="ms-description">
              {currentData.description}
            </p>
            <div className="ms-slider-controls">
              <button className="slider-btn prev-btn" onClick={slidePrev} aria-label="Previous items">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button className="slider-btn next-btn" onClick={slideNext} aria-label="Next items">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid / Slider */}
        <div ref={gridRef} className="ms-grid ms-fade-up">
          {currentData.products.map((product) => (
            <div key={product.id} className="ms-card-wrapper">
              <a href={product.link} className="ms-card">
                <div className="ms-card-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div className="ms-card-overlay" />
                </div>
                
                <div className="ms-card-footer">
                  <h4 className="ms-card-title">{product.name}</h4>
                  <div className="ms-card-arrow-wrap">
                    <div className="ms-card-arrow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

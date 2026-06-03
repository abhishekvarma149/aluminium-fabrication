import { useState, useEffect } from 'react';
import { useNavbarScroll } from '../hooks/useNavbarScroll';

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Design',   href: '#design'   },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Contact',  href: '#contact'  },
];

export default function Navbar() {
  const scrolled = useNavbarScroll(80);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header role="banner">
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="/" className="navbar-logo" aria-label="Aluminium — Home">
          Alumi<span>nium</span>
        </a>

        {/* Links */}
        <ul className="navbar-links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle & CTA */}
        <div className="navbar-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle dark/light mode"
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          
          <button
            id="navbar-cta-btn"
            className="navbar-cta"
            aria-label="Book a consultation"
          >
            Book Consultation
          </button>
        </div>
      </nav>
    </header>
  );
}

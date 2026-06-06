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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header role="banner">
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="/" className="navbar-logo" aria-label="Keerthi Aluminium Fabrication — Home">
          <img src="/logo.png" alt="Keerthi Aluminium Fabrication Logo" className="navbar-logo-img" />
          <span>Keerthi Aluminium Fabrication</span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar-links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle dark/light mode"
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

        {/* Mobile Menu Toggle Button */}
        <button
          className="mobile-menu-toggle"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-menu-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={toggleMenu}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn">
             {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
          <button className="navbar-cta" onClick={toggleMenu}>
            Book Consultation
          </button>
        </div>
      </div>
    </header>
  );
}

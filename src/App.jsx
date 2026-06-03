import './index.css';
import Navbar from './components/Navbar';
import HeroAnimation from './components/HeroAnimation';
import Section1 from './components/Section1';
import SpacesSection from './components/SpacesSection';
import Section2 from './components/Section2';
import MaterialShowcase from './components/MaterialShowcase';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />

      <main id="main-content" aria-label="Main content">
        <HeroAnimation />
        <SpacesSection />
        <MaterialShowcase />
      </main>

      <Footer />
    </>
  );
}

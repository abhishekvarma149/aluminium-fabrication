import { useEffect, useState } from 'react';

/**
 * Tracks navbar scroll state so we can apply the frosted-glass style
 * once the user has scrolled past the hero.
 */
export function useNavbarScroll(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

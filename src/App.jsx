import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import ImageSlider from './components/ImageSlider';
import RotatingText from './components/RotatingText';
import SplitText from './components/SplitText';
import { images } from './data/memories';

/**
 * Main App component that renders the anniversary celebration page
 * @returns {JSX.Element} App component
 */
function App() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Pixel transition
    const container = containerRef.current;
    gsap.from(container, {
      duration: 2,
      opacity: 0,
      scale: 0.8,
      ease: "power3.out",
      onComplete: () => setIsLoading(false)
    });

    // Handle scroll for back to top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        role="status"
        aria-label="Loading page"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        role="alert"
        aria-live="assertive"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-pink-100 text-pink-800 rounded hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            aria-label="Refresh page"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div 
        className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300"
        role="main"
      >
        <div ref={containerRef} className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <header className="text-center mb-8 sm:mb-16">
            <div 
              className="text-3xl sm:text-4xl md:text-6xl font-dancing text-pink-600 mb-4 drop-shadow-lg text-float"
              role="heading"
              aria-level="1"
            >
              <SplitText text="Happy First Anniversary My Love" />
            </div>
            <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 font-semibold">May 2, 2024 - May 2, 2025</p>
          </header>

          <div className="max-w-4xl mx-auto mb-12 sm:mb-20">
            <ImageSlider images={images} />
          </div>

          <div className="relative h-32 sm:h-40 w-auto mx-auto mb-12 sm:mb-20 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <span className="font-dancing text-xl sm:text-2xl text-pink-600">I love you</span>
              <RotatingText
                texts={['Darling', 'Baby', 'Sweetheart', 'Wifeyy', 'Cutie pie', 'My Love', 'My Life', 'My Everything', 'My Soulmate', 'My Best Friend', 'My Partner in Crime', 'My True Love', 'My Forever', 'My Always']}
                mainClassName="inline-block text-pink-600 font-dancing text-xl sm:text-2xl"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          </div>

          <div className="prose mx-auto text-center max-w-2xl dark:prose-invert mb-12 sm:mb-20 px-4">
            <p className="text-xl sm:text-2xl text-gray-800 dark:text-gray-200 mb-4 sm:mb-6 font-medium leading-relaxed">
              One year of endless love, countless memories, and infinite happiness.
              You make every day special just by being you.
            </p>
            <p className="text-2xl sm:text-3xl text-pink-600 font-dancing">
              Here's to many more years together! ❤️
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-pink-50 dark:bg-pink-900/20 rounded-2xl p-4 sm:p-8 shadow-lg border border-pink-200 dark:border-pink-800 mb-12 sm:mb-20">
            <h2 
              className="text-2xl sm:text-3xl font-dancing text-pink-600 text-center mb-4 sm:mb-6"
              role="heading"
              aria-level="2"
            >
              A small message for you
            </h2>
            <div className="space-y-3 sm:space-y-4 text-gray-800 dark:text-gray-200">
              <p className="text-base sm:text-lg leading-relaxed">
                My love, every moment with you feels like a beautiful dream I never want to wake up from. 
                Your smile brightens my darkest days, and your love gives me strength I never knew I had.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                I cherish every laugh we share, every tear we've wiped away, and every challenge we've faced together. 
                You're not just my partner, you're my best friend, my confidant, and my greatest blessing.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                I promise to love you more each day, to support you in all your dreams, and to be your rock when you need me. 
                You make my life complete, and I can't wait to create countless more memories with you.
              </p>
              <p className="text-lg sm:text-xl font-dancing text-pink-600 mt-4 sm:mt-6">
                Forever yours, with all my love ❤️
              </p>
            </div>
          </div>

          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-pink-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300"
              aria-label="Back to top"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
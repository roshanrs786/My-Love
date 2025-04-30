import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ErrorBoundary from './ErrorBoundary';
import ImageWithLoading from './ImageWithLoading';

const ImageSlider = ({ images }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Preload images
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = `/My-Love${image.src}`;
    });
  }, [images]);

  return (
    <ErrorBoundary>
      <div className="relative" role="region" aria-label="Memory slideshow">
        {isLoading && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg"
            role="status"
            aria-label="Loading images"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        )}
        
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Autoplay, Pagination]}
          className="mySwiper"
          onAfterInit={() => setIsLoading(false)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          style={{
            height: '600px',
            width: '400px',
            margin: '0 auto'
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}" role="button" aria-label="Go to slide ${index + 1}"></span>`;
            },
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          a11y={{
            enabled: true,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <ImageWithLoading
                  src={`/My-Love${image.src}`}
                  alt={image.alt}
                  className="rounded-lg shadow-xl h-full w-full object-cover"
                  loading="lazy"
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg"
                  aria-hidden="true"
                >
                  <p className="text-white text-sm font-medium">{image.date}</p>
                  <p className="text-white/90 text-xs">{image.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div 
          className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
          role="status"
          aria-live="polite"
        >
          Image {activeIndex + 1} of {images.length}
        </div>
      </div>
    </ErrorBoundary>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageSlider; 
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const ImageWithLoading = ({ 
  src, 
  alt, 
  className, 
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError();
  };

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setIsLoading(true);
      setHasError(false);
    }
  };

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = handleLoad;
    img.onerror = handleError;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, retryCount]);

  return (
    <div 
      className={`relative ${className}`} 
      style={{ aspectRatio: '2/3' }}
      role="img"
      aria-label={alt}
    >
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse"
          role="status"
          aria-label="Loading image"
        >
          <div 
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"
            aria-hidden="true"
          />
        </div>
      )}
      
      {hasError ? (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
          role="alert"
          aria-label="Image failed to load"
        >
          <div className="text-center">
            <p className="text-gray-500">Failed to load image</p>
            {retryCount < maxRetries ? (
              <button
                className="mt-2 px-4 py-2 bg-pink-100 text-pink-800 rounded hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                onClick={handleRetry}
                aria-label="Retry loading image"
              >
                Retry
              </button>
            ) : (
              <p className="text-gray-500 mt-2">Maximum retry attempts reached</p>
            )}
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};

ImageWithLoading.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

export default ImageWithLoading; 
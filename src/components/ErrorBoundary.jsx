import PropTypes from 'prop-types';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0,
      lastErrorTime: null
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      lastErrorTime: Date.now()
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    const { retryCount, lastErrorTime } = this.state;
    const now = Date.now();
    const timeSinceLastError = now - lastErrorTime;
    
    // If it's been less than 5 seconds since the last error, increment retry count
    if (timeSinceLastError < 5000) {
      this.setState(prevState => ({
        retryCount: prevState.retryCount + 1
      }));
    } else {
      // Reset retry count if it's been more than 5 seconds
      this.setState({ retryCount: 0 });
    }

    // Reset error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReset = () => {
    // Reset everything
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      lastErrorTime: null
    });
  };

  render() {
    if (this.state.hasError) {
      const { retryCount } = this.state;
      const maxRetries = 3;
      const canRetry = retryCount < maxRetries;

      return (
        <div 
          className="p-4 bg-red-50 rounded-lg max-w-md mx-auto"
          role="alert"
          aria-live="assertive"
        >
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-600 mb-4">
            {this.state.error && this.state.error.toString()}
          </p>
          <div className="space-y-2">
            {canRetry ? (
              <button
                className="w-full px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={this.handleRetry}
                aria-label="Retry loading the component"
              >
                Try again
              </button>
            ) : (
              <p className="text-red-600 text-sm">
                Maximum retry attempts reached. Please refresh the page.
              </p>
            )}
            <button
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={this.handleReset}
              aria-label="Reset the component"
            >
              Reset
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <details className="mt-4 text-sm">
              <summary className="cursor-pointer text-gray-600">Error Details</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary; 
import { animated, useSpring } from '@react-spring/web';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * SplitText component animates each character of the text individually
 * @param {Object} props - Component props
 * @param {string} props.text - The text to be split and animated
 * @returns {JSX.Element} SplitText component
 */
const SplitText = ({ text }) => {
  return (
    <div className="flex justify-center flex-wrap">
      {text.split('').map((char, index) => {
        const props = useSpring({
          from: { opacity: 0, transform: 'translateY(50px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
          delay: index * 100,
        });

        return (
          <animated.span
            key={index}
            style={props}
            className="inline-block mx-1"
          >
            {char}
          </animated.span>
        );
      })}
    </div>
  );
};

SplitText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SplitText; 
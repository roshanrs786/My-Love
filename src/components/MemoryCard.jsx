import PropTypes from 'prop-types';
import React from 'react';

/**
 * MemoryCard component displays a single memory with date, title, and description
 * @param {Object} props - Component props
 * @param {string} props.date - The date of the memory
 * @param {string} props.title - The title of the memory
 * @param {string} props.description - The description of the memory
 * @returns {JSX.Element} MemoryCard component
 */
const MemoryCard = ({ date, title, description }) => {
  return (
    <div className="bg-pink-50 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="text-pink-500 font-semibold mb-2">{date}</div>
      <h3 className="text-2xl font-dancing text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

MemoryCard.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default MemoryCard; 
import React, { useState } from 'react';
import { FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';

const JobCard = ({ job, searchTerm = '' }) => {
  const [imageError, setImageError] = useState(false);

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'internship': return 'text-accent-intern bg-accent-intern/10 border-accent-intern/20';
      case 'full-time': return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'contract': return 'text-accent-contract bg-accent-contract/10 border-accent-contract/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const HighlightedText = ({ text, highlight }) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="bg-primary/30 text-white font-bold px-1 rounded-sm">{part}</span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="group relative glass-panel rounded-2xl p-6 hover:translate-y-[-4px] transition-all duration-300 hover:shadow-xl hover:border-primary/50 cursor-pointer flex flex-col h-full bg-dark-card border border-dark-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-dark-border group-hover:border-primary/30 transition-colors bg-dark-input flex items-center justify-center">
            {job.logo && !imageError ? (
              <img
                src={job.logo}
                alt={job.company}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-xl font-bold text-gray-400 group-hover:text-primary transition-colors">
                {job.company.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
              <HighlightedText text={job.title} highlight={searchTerm} />
            </h3>
            <p className="text-gray-400 text-sm font-medium">{job.company}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(job.type)}`}>
          {job.type}
        </span>
        <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border border-dark-border text-gray-300 bg-dark-input/50">
          <FiMapPin className="w-3 h-3 text-gray-400" />
          {job.location}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-dark-border/50">
        <span className="flex items-center gap-1">
          <FiClock className="w-4 h-4" />
          {job.posted}
        </span>
        <button className="text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 flex items-center gap-1 cursor-pointer">
          Apply <FiArrowRight className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;


import React from 'react';

const JobCard = ({ job, searchTerm = '' }) => {
  const getTypeColor = (type) => {
    switch(type.toLowerCase()) {
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
            {job.logo ? (
              <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
            ) : (
               <div className="text-xl font-bold text-gray-600">{job.company.charAt(0)}</div>
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
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-dark-border/50">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {job.posted}
        </span>
        <button className="text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 flex items-center gap-1">
          Apply <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};

export default JobCard;

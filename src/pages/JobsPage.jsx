
import React, { useState, useMemo } from 'react'
import { jobs } from '../data/jobs'
import JobCard from '../components/JobCard'
import { Link } from 'react-router-dom'

function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest') // 'newest' or 'alphabetical'

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLocation = locationFilter === 'All' || 
                             (locationFilter === 'Remote' ? job.location === 'Remote' : job.location !== 'Remote')
      const matchesType = typeFilter === 'All' || job.type === typeFilter

      return matchesSearch && matchesLocation && matchesType
    }).sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title)
      }
      return b.id - a.id // Default to newest (higher ID first)
    })
  }, [searchTerm, locationFilter, typeFilter, sortBy])

  // Get unique job types for filter dropdown
  const jobTypes = ['All', ...new Set(jobs.map(job => job.type))]

  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation / Header */}
         <nav className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-white hover:text-primary transition-colors">Cygnus Careers</Link>
        </nav>

        {/* Header Section */}
        <header className="text-center space-y-4 py-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-300 to-primary-500 animate-pulse-slow relative z-10">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto relative z-10">
            Browse through hundreds of job opportunities from top companies.
          </p>
        </header>

        {/* Filters & Search Section */}
        <div className="glass-panel p-6 rounded-2xl shadow-glass space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by title or company..."
                className="w-full bg-dark-input border border-dark-border rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Location Filter */}
            <div className="md:col-span-3">
              <select
                className="w-full bg-dark-input border border-dark-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer hover:border-gray-500"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="All">Any Location</option>
                <option value="Remote">Remote Only</option>
                <option value="On-site">On-site Only</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="md:col-span-2">
              <select
                className="w-full bg-dark-input border border-dark-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer hover:border-gray-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                ))}
              </select>
            </div>

            {/* Sort Toggle */}
             <div className="md:col-span-2">
              <select
                className="w-full bg-dark-input border border-dark-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer hover:border-gray-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="alphabetical">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-gray-400 px-2">
            <p>Showing <span className="text-white font-semibold">{filteredJobs.length}</span> jobs</p>
          </div>
          
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredJobs.map(job => (
                <div key={job.id} className="h-full">
                  <JobCard job={job} searchTerm={searchTerm} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-dark-card/50 rounded-3xl border border-dashed border-dark-border">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-2">No jobs found</h3>
              <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={() => {setSearchTerm(''); setLocationFilter('All'); setTypeFilter('All');}}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobsPage

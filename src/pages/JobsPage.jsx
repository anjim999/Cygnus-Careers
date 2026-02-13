
import React, { useState, useMemo, useEffect } from 'react'
import { jobs } from '../data/jobs'
import JobCard from '../components/JobCard'
import { Link } from 'react-router-dom'

function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest') // 'newest' or 'alphabetical'

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, locationFilter, typeFilter, sortBy])

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

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 300, behavior: 'smooth' })
    }
  }

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
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/70 to-primary animate-pulse-slow relative z-10">
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
            <div className="md:col-span-3 relative">
              <select
                className="w-full bg-dark-input border border-dark-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer hover:border-gray-500"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="All">Any Location</option>
                <option value="Remote">Remote Only</option>
                <option value="On-site">On-site Only</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Type Filter */}
            <div className="md:col-span-2 relative">
              <select
                className="w-full bg-dark-input border border-dark-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer hover:border-gray-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Sort Toggle */}
            <div className="md:col-span-2 relative">
              <select
                className="w-full bg-dark-input border border-dark-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer hover:border-gray-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="alphabetical">Name (A-Z)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-gray-400 px-2">
            <p>
              Showing <span className="text-white font-semibold">
                {filteredJobs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                -
                {Math.min(currentPage * itemsPerPage, filteredJobs.length)}
              </span> of <span className="text-white font-semibold">{filteredJobs.length}</span> jobs
            </p>
          </div>

          {paginatedJobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedJobs.map(job => (
                  <div key={job.id} className="h-full">
                    <JobCard job={job} searchTerm={searchTerm} />
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-dark-input border border-dark-border text-white hover:bg-dark-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg border transition-all duration-200 flex items-center justify-center font-medium ${currentPage === page
                          ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(92,98,236,0.3)]'
                          : 'bg-dark-input border-dark-border text-gray-400 hover:text-white hover:border-gray-500'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-dark-input border border-dark-border text-white hover:bg-dark-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-dark-card/50 rounded-3xl border border-dashed border-dark-border">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-2">No jobs found</h3>
              <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
              <button
                onClick={() => { setSearchTerm(''); setLocationFilter('All'); setTypeFilter('All'); }}
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

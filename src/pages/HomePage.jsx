
import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans flex flex-col relative overflow-hidden">
      {/* Background Visuals */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter text-white">
          Cygnus Careers<span className="text-primary">.</span>
        </div>
        <div>
          <Link to="/jobs" className="px-5 py-2.5 rounded-full border border-dark-border bg-dark-card/50 hover:bg-dark-card hover:border-primary/50 transition-all duration-300 font-medium text-sm">
            Browse Jobs
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4 relative z-10 max-w-5xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm mb-4 animate-bounce-slow">
            The #1 Job Board for Developers
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/60 to-primary">
            Find Work That <br />
            <span className="text-white">Matters.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Connect with top tech companies and startups. Remote, hybrid, or on-site — your next chapter starts here.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link to="/jobs" className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary-hover transition-transform hover:scale-105 shadow-xl shadow-primary/25 text-center">
            Start Your Search
          </Link>
          <button
            onClick={() => toast('Employer portal involves backend logic! Coming soon.', {
              icon: '🚧',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })}
            className="px-8 py-4 bg-dark-card border border-dark-border text-white text-lg font-bold rounded-full hover:bg-dark-border hover:text-white transition-all hover:scale-105 cursor-pointer"
          >
            Post a Job
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-16 border-t border-dark-border/30 w-full mt-12">
          <div className="space-y-1">
            <h3 className="text-4xl font-bold text-white">2k+</h3>
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Live Jobs</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-bold text-white">500+</h3>
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Companies</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-bold text-white">15k+</h3>
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Candidates</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-bold text-white">Global</h3>
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Remote First</p>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 text-center text-gray-600 text-sm relative z-10">
        &copy; {new Date().getFullYear()} Cygnus Job Board. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

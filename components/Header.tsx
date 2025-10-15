import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';
import { ChevronDownIcon } from './Icons';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { xp, level } = useGamification();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-teal text-white' : 'text-navy hover:bg-light-blue hover:text-navy'
    }`;

  if (!user) return null;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center gap-2">
              <img src="/src/assets/full-logo.svg" alt="ProConnect Logo" className="h-8 w-auto" />
            </Link>
          </div>
          <nav className="hidden md:flex justify-center">
            <div className="flex items-baseline space-x-4">
              <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
              <NavLink to="/courses" className={navLinkClass}>Courses</NavLink>
              <NavLink to="/mentorship" className={navLinkClass}>Mentorship</NavLink>
              <NavLink to="/leaderboard" className={navLinkClass}>Leaderboard</NavLink>
              <NavLink to="/forum" className={navLinkClass}>Forum</NavLink>
            </div>
          </nav>
          <div className="relative flex-1 flex items-center justify-end">
            <button 
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-light-blue transition-colors"
            >
              <img className="h-9 w-9 rounded-full object-cover" src={user.avatar} alt={user.name} />
              <span className="hidden sm:inline text-sm font-medium text-navy">{user.name}</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-500"/>
            </button>
            {isDropdownOpen && (
              <div 
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="py-1">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-bold text-navy">{user.name}</p>
                    <p className="text-xs text-gray-500 font-mono">Level {level} | {xp} XP</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                  <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-coral hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
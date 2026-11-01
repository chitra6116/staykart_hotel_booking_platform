import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import NotificationDropdown from './NotificationDropdown';
import CountrySelector from './CountrySelector';
import {
  Hotel,
  Calendar,
  ShieldCheck,
  Moon,
  Sun,
  User,
  LogOut,
  Menu,
  X,
  Compass
} from 'lucide-react';

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    toast.info('You have logged out successfully.', 4000, 'Logged Out');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.3)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-teal-500/25 group-hover:scale-105 group-hover:shadow-teal-500/40 transition-all duration-200">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-xl sm:text-22px font-extrabold tracking-tight text-teal-900 dark:text-white">
                  Stay<span className="text-saffron-500">Kart</span>
                </span>
                <span className="ml-1 w-2 h-2 rounded-full bg-saffron-500 animate-pulse"></span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider -mt-1 hidden sm:block">
                Book Smart. Stay Easy.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60">
            <Link
              to="/search"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive('/search')
                  ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Explore Stays
            </Link>

            {user && !isAdmin && (
              <Link
                to="/my-bookings"
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive('/my-bookings')
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                My Bookings
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-saffron-300" />
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Desktop Controls (Theme, Country, Notifications, Auth) */}
          <div className="hidden md:flex items-center gap-2.5">
            <CountrySelector />
            <NotificationDropdown />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
                    {user.fullName?.charAt(0) || 'G'}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[120px] truncate">
                    {user.fullName?.split(' ')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-50 animate-scale-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {user.fullName}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {!isAdmin && (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          My Profile
                        </Link>

                        <Link
                          to="/my-bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        >
                          <Calendar className="w-4 h-4 text-slate-400" />
                          My Bookings
                        </Link>
                      </>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-slate-100 dark:border-slate-700/60 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 shadow-sm transition-all"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-1.5 md:hidden">
            <NotificationDropdown />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-5 pt-3 pb-6 space-y-4 animate-fade-in shadow-xl">
          <Link
            to="/search"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors ${
              isActive('/search')
                ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Compass className="w-5 h-5 text-teal-500" />
            Explore Stays
          </Link>

          {user && !isAdmin && (
            <Link
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/my-bookings')
                  ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-5 h-5 text-teal-500" />
              My Bookings
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50"
            >
              <ShieldCheck className="w-5 h-5 text-saffron-500" />
              Admin Dashboard
            </Link>
          )}

          {/* Mobile Country Selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <CountrySelector isMobile />
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-sm">
                    {user.fullName?.charAt(0) || 'G'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.fullName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
                {!isAdmin && (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    My Profile
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-sm font-bold text-white shadow-md shadow-teal-500/25 transition-all"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiCalendar,
  FiHome,
  FiActivity,
  FiFileText,
  FiClipboard,
  FiClock,
  FiInfo,
  FiStar,
  FiHeart,
  FiSearch,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

/* ── LOGO SVG ── */
const NexoraLogo = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer circle with gradient */}
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2E86C1" />
        <stop offset="50%" stopColor="#1A5C85" />
        <stop offset="100%" stopColor="#5B9DB8" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#logoGrad)" />
    {/* Medical cross */}
    <rect x="16" y="9" width="8" height="22" rx="2" fill="white" />
    <rect x="9" y="16" width="22" height="8" rx="2" fill="white" />
    {/* Heartbeat accent */}
    <path
      d="M11 20h4l2-4 3 8 2-4h7"
      stroke="rgba(46,134,193,0.5)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/* ── DESKTOP NAV LINK WITH UNDERLINE ── */
/* ── DESKTOP NAV LINK WITH CENTER-EXPANDING UNDERLINE ── */
const NavItem = ({ link, isActive, onClick }) => (
  <Link
    to={link.path}
    onClick={onClick}
    className="relative flex items-center gap-1.5 px-3.5 py-2.5 text-base font-medium transition-colors duration-300 group"
    style={{ color: isActive ? '#2E86C1' : '#4A6572' }}
  >
    <span
      className="transition-colors duration-300 flex-shrink-0"
      style={{ color: isActive ? '#2E86C1' : '#7B96A5' }}
    >
      {link.icon}
    </span>

    <span className="group-hover:text-[#2E86C1] transition-colors duration-300 whitespace-nowrap">
      {link.label}
    </span>

    {/* Active underline — animates from center outward */}
    {/* Active underline */}
<span
  className="absolute -bottom-1 left-1/2 w-[70%] h-[3px] rounded-full transition-transform duration-300 ease-out"
  style={{
    background: 'linear-gradient(90deg, #2E86C1, #1A5C85)',
    transform: isActive ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
    transformOrigin: 'center',
  }}
/>

{/* Hover underline */}
{!isActive && (
  <span
  className={`absolute -bottom-1 left-1/2 w-[70%] h-[3px] rounded-full transition-all duration-300 ${
    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
  }`}
  style={{
    background: 'linear-gradient(90deg, #2E86C1, #1A5C85)',
    transform: 'translateX(-50%) ',
    transformOrigin: 'center',
  }}

/>
)}
  </Link>
);

/* ── MOBILE NAV LINK WITH UNDERLINE ── */
const MobileNavItem = ({ link, isActive, onClick }) => (
  <Link
    to={link.path}
    onClick={onClick}
    className="relative flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 group"
    style={{ color: isActive ? '#2E86C1' : '#4A6572' }}
  >
    <span style={{ color: isActive ? '#2E86C1' : '#7B96A5' }}>
      {link.icon}
    </span>
    <span className="group-hover:text-[#2E86C1] transition-colors duration-300">
      {link.label}
    </span>

    {/* Left-side active indicator */}
    {isActive && (
      <motion.span
        layoutId="mobile-nav-indicator"
        className="absolute left-0 top-5bottom-2 w-[3px] rounded-r-full"
        style={{
          background: 'linear-gradient(180deg, #2E86C1, #5B9DB8)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    )}

    {/* Bottom underline on hover (non-active) */}
    {!isActive && (
      <span
        className="absolute bottom-1 left-4 right-4 h-[1.5px] rounded-full bg-[#124b62] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
      />
    )}
  </Link>
);

/* ── NAVBAR ── */
const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  /* ── BUILD NAV LINKS ── */
  const navLinks = user
    ? user.role === 'patient'
      ? [
          { path: '/patient/dashboard', label: 'Dashboard', icon: <FiHome size={15} /> },
          { path: '/patient/symptoms', label: 'Find Doctor', icon: <FiSearch size={15} /> },
          { path: '/patient/appointments', label: 'Appointments', icon: <FiCalendar size={15} /> },
          { path: '/patient/prescriptions', label: 'Prescriptions', icon: <FiFileText size={15} /> },
          { path: '/patient/lab-reports', label: 'Lab Reports', icon: <FiClipboard size={15} /> },
        ]
      : [
          { path: '/doctor/dashboard', label: 'Dashboard', icon: <FiHome size={15} /> },
          { path: '/doctor/appointments', label: 'Appointments', icon: <FiCalendar size={15} /> },
          { path: '/doctor/prescriptions', label: 'Prescriptions', icon: <FiFileText size={15} /> },
          { path: '/doctor/schedule', label: 'Schedule', icon: <FiClock size={15} /> },
        ]
    : [
        { path: '/', label: 'Home', icon: <FiHome size={15} /> },
        { path: '/#how-it-works', label: 'How It Works', icon: <FiInfo size={15} /> },
        { path: '/#specializations', label: 'Specializations', icon: <FiHeart size={15} /> },
        { path: '/#reviews', label: 'Reviews', icon: <FiStar size={15} /> },
      ];

  return (
    <motion.nav
      initial={false}
      animate={{
        backdropFilter: isScrolled ? 'blur(30px)' : 'blur(20px)',
        WebkitBackdropFilter: isScrolled ? 'blur(30px)' : 'blur(20px)',
      }}
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 rounded-2xl px-10 transition-all duration-500 w-[calc(100%-32px)] max-w-9xl`}
  style={{
    height: '55px',           // ← explicit fixed height
    display: 'flex',
    alignItems: 'center',  
        background: isScrolled
          ? 'rgba(255, 255, 255, 0.82)'
          : 'rgba(255, 255, 255, 0.55)',
        border: `1px solid ${
          isScrolled
            ? 'rgba(46, 134, 193, 0.12)'
            : 'rgba(255, 255, 255, 0.35)'
        }`,
        boxShadow: isScrolled
          ? '0 8px 32px rgba(46, 134, 193, 0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)'
          : '0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)',
      }}
    >
      <div className="flex items-center justify-between w-full gap-10">
        {/* ── LOGO ── */}
        <Link
          to={user ? `/${user.role}/dashboard` : '/'}
          className="flex items-center gap-4 group select-none translate-x-5"
        >
          <div >
            <NexoraLogo />
          </div>
          <div className="hidden sm:flex flex-col leading-none ">
            <span
              className="text-[1.8rem] font-bold tracking-wide "
              style={{
                fontFamily: "'Playfair Display', serif",
                background: 'linear-gradient(135deg, #1A5C85 0%, #2E86C1 50%, #5B9DB8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nexora
            </span>
            <span
              className="text-[0.6rem] font-semibold tracking-[0.3em] uppercase"
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: 'grey',
              }}
            >
              Healthcare
            </span>
          </div>
        </Link>

        {/* ── DESKTOP NAV LINKS ── */}
        <div className="hidden md:flex justify-center gap-8">
          {navLinks.map((link) => (
            <NavItem
              key={link.path}
              link={link}
              isActive={location.pathname === link.path}
            />
          ))}
        </div>

        {/* ── AUTH BUTTONS ── */}
        <div className="hidden md:flex justify-end gap-4 pr-6">
          {user ? (
            <div className="flex items-center gap-2">
              {/* Profile Link */}
              <Link
                to={`/${user.role}/profile`}
                className="flex items-center gap-3 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 group"
                style={{ color: '#4A6572' }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #2E86C1, #1A5C85, #5B9DB8)',
                  }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="group-hover:text-[#2E86C1] transition-colors duration-300">
                  {user.name?.split(' ')[0]}
                </span>
              </Link>

              {/* Divider */}
              <div className="w-px h-5 bg-[#C4DAE8] opacity-60" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-500 hover:bg-red-50/70 transition-all duration-300 cursor-pointer"
              >
                <FiLogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="relative px-4 py-2 right-4.5 rounded-xl text font-medium transition-all duration-300 group overflow-hidden"
                style={{ color: '#2E86C1' }}
              >
                <span className="relative z-10">Log In</span>
                <span
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(46, 134, 193, 0.08)' }}
                />
              </Link>
              {/* <Link
                to="/register"
                className="relative px-5 py-2 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #2E86C1 0%, #1A5C85 100%)',
                  boxShadow: '0 4px 15px rgba(46, 134, 193, 0.35)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 6px 25px rgba(46, 134, 193, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 4px 15px rgba(46, 134, 193, 0.35)';
                }}
              >
                Get Started
              </Link> */}
            </div>
          )}
        </div>

        {/* ── MOBILE TOGGLE ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl transition-colors duration-300 cursor-pointer"
          style={{
            color: '#1C3447',
            background: mobileOpen ? 'rgba(46, 134, 193, 0.08)' : 'transparent',
          }}
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div
              className="mt-3 pt-3 flex flex-col gap-0.5"
              style={{ borderTop: '1px solid rgba(196, 218, 232, 0.4)' }}
            >
              {navLinks.map((link) => (
                <MobileNavItem
                  key={link.path}
                  link={link}
                  isActive={location.pathname === link.path}
                  onClick={() => setMobileOpen(false)}
                />
              ))}

              {/* Divider */}
              <div
                className="my-2 mx-4"
                style={{ borderTop: '1px solid rgba(196, 218, 232, 0.3)' }}
              />

              {user ? (
                <>
                  <Link
                    to={`/${user.role}/profile`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#4A6572] hover:text-[#2E86C1] transition-all duration-300"
                  >
                    <FiUser size={15} />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-500 hover:bg-red-50/70 transition-all duration-300 text-left cursor-pointer"
                  >
                    <FiLogOut size={15} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2 mt-1 px-4 pb-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                    style={{
                      border: '1.5px solid #2E86C1',
                      color: '#2E86C1',
                    }}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #2E86C1, #1A5C85)',
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiGrid,
  FiPackage,
} from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, isAdmin, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const openMenu = () => setOpen(true);

  const closeMenu = () => setOpen(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu after route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out. See you back on the road.");
    } finally {
      navigate("/");
    }
  };

  const formatName = (str) => {
    if (!str) return "";

    return str
      .toLowerCase()
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium tracking-tight transition-colors duration-200 ${isActive
      ? "text-fog"
      : "text-steel hover:text-fog"
    }`;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "glass-strong shadow-lg shadow-black/20"
          : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
          >
            <rect
              width="32"
              height="32"
              rx="7"
              fill="#FF5A36"
            />
            <path
              d="M8 23 L15 9 L18 9 L13 18 L20 18 L25 9 L27 9 L20 25 L15 25 L18 19 L13 19 Z"
              fill="#0B0C0E"
            />
          </svg>

          <span className="font-display text-lg font-bold tracking-tight text-fog">
            KESTREL <span className="text-ember">MOTORS</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user && (
            <NavLink
              to="/my-orders"
              className="flex items-center gap-1.5 text-sm font-medium text-steel transition hover:text-fog"
            >
              <FiPackage size={16} />
              My Orders
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              className="flex items-center gap-1.5 text-sm font-medium text-signal transition hover:text-signal/80"
            >
              <FiGrid size={16} />
              Dashboard
            </NavLink>
          )}

          {user && (
            <span className="mr-2 text-sm font-medium text-steel">
              Welcome,{" "}
              <span className="font-semibold text-fog first-letter:capitalize">
                {formatName(user.name)}
              </span>
            </span>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-fog transition hover:border-ember/60 hover:text-ember"
            >
              <FiLogOut size={15} />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-steel transition hover:text-fog"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-ember px-4 py-2 text-sm font-semibold text-obsidian transition hover:bg-ember-light"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="text-fog lg:hidden"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          {open ? (
            <FiX size={26} />
          ) : (
            <FiMenu size={26} />
          )}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden glass-strong lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-6 pt-2">
              {user && (
                <div className="mb-2 border-b border-white/5 px-3 py-2">
                  <p className="text-xs text-steel">Logged in as</p>
                  <p className="text-sm font-semibold text-fog first-letter:capitalize">
                    {formatName(user.name)}
                  </p>
                </div>
              )}

              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-sm font-medium ${isActive
                      ? "bg-white/5 text-fog"
                      : "text-steel"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {user && (
                <NavLink
                  to="/my-orders"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-steel"
                >
                  My Orders
                </NavLink>
              )}

              {isAdmin && (
                <NavLink
                  to="/admin/dashboard"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-signal"
                >
                  Dashboard
                </NavLink>
              )}

              <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-4">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-medium text-fog"
                  >
                    <FiLogOut size={16} />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-medium text-fog"
                    >
                      <FiUser size={16} />
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="rounded-xl bg-ember py-3 text-center text-sm font-semibold text-obsidian"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
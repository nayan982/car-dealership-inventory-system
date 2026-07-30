import { useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiGrid,
  FiTruck,
  FiShoppingBag,
  FiMenu,
  FiLogOut,
  FiArrowLeft,
} from "react-icons/fi";

import { useAuth } from "../hooks/useAuth";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/admin/vehicles", label: "Manage Vehicles", icon: FiTruck },
  { to: "/admin/orders", label: "Manage Orders", icon: FiShoppingBag },
];

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const openSidebar = () => setOpen(true);

  const closeSidebar = () => setOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out.");
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
  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <Link to="/" className="flex items-center gap-2 px-6 py-6">
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="7" fill="#FF5A36" />
          <path
            d="M8 23 L15 9 L18 9 L13 18 L20 18 L25 9 L27 9 L20 25 L15 25 L18 19 L13 19 Z"
            fill="#0B0C0E"
          />
        </svg>

        <span className="font-display text-base font-bold text-fog">
          KESTREL <span className="text-ember">ADMIN</span>
        </span>
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                ? "bg-ember/15 text-ember"
                : "text-steel hover:bg-white/5 hover:text-fog"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-3 border-t border-white/5 p-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-2 text-xs text-steel hover:text-fog"
        >
          <FiArrowLeft size={14} />
          Back to site
        </Link>

        <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5">
          <div>
            <p className="text-xs text-steel">Signed in as</p>
            <p className="truncate text-sm font-medium text-fog">
              {formatName(user?.name) || "Admin"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="rounded-lg p-2 text-steel transition hover:bg-white/10 hover:text-ember"
          >
            <FiLogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-obsidian">
      <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-obsidian-2 lg:block">
        <div className="fixed h-screen w-64">
          <SidebarContent />
        </div>
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            />

            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-64 bg-obsidian-2 lg:hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
              }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-white/5 bg-obsidian-2/60 px-5 py-4 backdrop-blur lg:hidden">
          <span className="font-display text-base font-bold text-fog">
            KESTREL <span className="text-ember">ADMIN</span>
          </span>

          <button
            onClick={openSidebar}
            aria-label="Open menu"
            className="text-fog"
          >
            <FiMenu size={22} />
          </button>
        </header>

        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

const NotFound = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
    <motion.p
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="font-display text-8xl font-bold text-gradient"
    >
      404
    </motion.p>
    <h1
      role="heading"
      aria-level={1}
      className="mt-4 font-display text-2xl font-semibold text-fog"
    >
      Looks like this road doesn't go anywhere.
    </h1>
    <p className="mt-2 max-w-sm text-sm text-steel">
      The page you're looking for has been moved, deleted, or never existed.
    </p>
    <Link
      to="/"
      className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ember px-6 py-3 text-sm font-semibold text-obsidian transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-light"
    >
      <FiArrowLeft /> Back to Home
    </Link>
  </div>
);

export default NotFound;

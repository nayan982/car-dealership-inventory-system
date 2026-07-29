import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const Modal = ({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
}) => {
  const modalClass = `glass-strong relative w-full ${maxWidth} rounded-2xl p-6 shadow-2xl`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={modalClass}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{
              type: "spring",
              damping: 24,
              stiffness: 300,
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-fog">
                {title}
              </h3>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1.5 text-steel transition hover:bg-white/10 hover:text-fog"
              >
                <FiX size={18} />
              </button>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
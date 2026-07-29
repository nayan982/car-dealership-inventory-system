import { motion } from "framer-motion";
import { FiTarget, FiHeart, FiTrendingUp } from "react-icons/fi";

const values = [
  {
    icon: FiTarget,
    title: "Transparency",
    text: "Every price, spec, and history detail is listed as-is. No hidden fees, no surprise markups.",
  },
  {
    icon: FiHeart,
    title: "Customer First",
    text: "From browsing to delivery, the experience is designed around your time and trust.",
  },
  {
    icon: FiTrendingUp,
    title: "Constant Curation",
    text: "We add and retire listings weekly to keep the inventory sharp and relevant.",
  },
];

const stats = [
  { value: "2018", label: "Founded" },
  { value: "1,200+", label: "Cars Delivered" },
  { value: "24", label: "States Served" },
  { value: "4.8/5", label: "Avg. Rating" },
];

const About = () => {
  return (
    <div className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
            Our story
          </p>

          <h1 className="mt-3 font-display text-4xl font-bold text-fog lg:text-5xl">
            Built by people who actually love cars.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-steel-light">
            Kestrel Motors started as a small lot of hand-picked vehicles and
            grew into a fully digital dealership. We believe buying a car
            should feel as considered as the vehicle itself — clear pricing,
            honest specs, and a delivery experience that respects your time.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/5 bg-obsidian-2 p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember/10 text-ember">
                <Icon size={20} />
              </div>

              <h3 className="mt-4 font-display text-base font-semibold text-fog">
                {title}
              </h3>

              <p className="mt-2 text-sm text-steel">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop"
            alt="Kestrel Motors showroom"
            className="h-72 w-full object-cover lg:h-96"
          />
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-gradient">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-steel">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiShield,
  FiTruck,
  FiTool,
  FiStar,
  FiZap,
} from "react-icons/fi";
import VehicleCard from "../components/vehicle/VehicleCard";
import { SkeletonGrid } from "../components/common/SkeletonCard";
import EmptyState from "../components/common/EmptyState";
import { vehicleService } from "../services/vehicleService";
import { CATEGORIES } from "../utils/constants";

const whyChooseUs = [
  { icon: FiShield, title: "Certified Quality", text: "Every vehicle passes a 150-point inspection before it reaches you." },
  { icon: FiTruck, title: "Door-to-Door Delivery", text: "Cash on delivery, scheduled to your address, no dealership visit required." },
  { icon: FiTool, title: "Genuine Parts", text: "Factory-spec components and transparent service history on every listing." },
  { icon: FiZap, title: "Fast Turnaround", text: "From order to delivery, most vehicles ship within 5 business days." },
];

const testimonials = [
  { name: "Priya N.", role: "Verified Buyer", text: "The listing was accurate down to the mileage. Delivery was faster than the estimate.", rating: 5 },
  { name: "Rahul S.", role: "Verified Buyer", text: "Ordering felt like buying a flagship phone, not a car. Genuinely impressed.", rating: 5 },
  { name: "Ashish R.", role: "Verified Buyer", text: "Cash on delivery made the whole process low-stress. Would order again.", rating: 4 },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await vehicleService.getAll({ limit: 8 });
        const list = Array.isArray(data) ? data : data?.vehicles || [];
        setFeatured(list.slice(0, 4));
        setLatest([...list].reverse().slice(0, 4));
      } catch {
        setFeatured([]);
        setLatest([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-24 pt-16 lg:px-8 lg:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-ember/10 blur-[140px]" />
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-signal/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-ember">
                0 – 100 in one click
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-fog sm:text-5xl lg:text-6xl">
                Precision.
                <br />
                Performance.
                <br />
                <span className="text-gradient">Delivered.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base text-steel-light">
                Kestrel Motors is a curated inventory of performance and luxury
                vehicles — inspected, priced transparently, and delivered to
                your door on cash-on-delivery terms.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/vehicles"
                  className="inline-flex items-center gap-2 rounded-xl bg-ember px-6 py-3.5 text-sm font-semibold text-obsidian shadow-[0_8px_24px_-6px_rgba(255,90,54,0.5)] transition hover:bg-ember-light"
                >
                  Browse Inventory <FiArrowRight />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-fog transition hover:border-ember/50 hover:text-ember"
                >
                  Our Story
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[
                  ["1,200+", "Vehicles Delivered"],
                  ["4.8/5", "Average Rating"],
                  ["24", "States Served"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="font-display text-2xl font-bold text-fog">{value}</p>
                    <p className="mt-1 text-xs text-steel">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
                  alt="Featured performance vehicle"
                  className="h-[380px] w-full object-cover lg:h-[460px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
              </div>
              <div className="glass absolute -bottom-6 -left-6 hidden rounded-2xl px-5 py-4 sm:block">
                <p className="font-mono text-[11px] uppercase tracking-widest text-steel">Starting at</p>
                <p className="font-display text-xl font-bold text-fog">₹ 2,718,950</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Browse by type</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-fog">Categories</h2>
            </div>
          </div>
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/vehicles?category=${encodeURIComponent(cat)}`}
                className="shrink-0 rounded-2xl border border-white/10 bg-obsidian-2 px-6 py-4 text-sm font-medium text-steel-light transition hover:border-ember/50 hover:bg-ember/10 hover:text-ember"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Handpicked</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-fog">Featured Vehicles</h2>
            </div>
            <Link to="/vehicles" className="hidden items-center gap-1 text-sm font-medium text-ember sm:flex">
              View all <FiArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-8">
            {loading ? (
              <SkeletonGrid count={4} />
            ) : featured.length === 0 ? (
              <EmptyState title="No vehicles yet" message="Check back soon — new inventory is added regularly." />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featured.map((v) => (
                  <VehicleCard key={v._id} vehicle={v} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/5 bg-obsidian-2 p-8 lg:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">The Kestrel standard</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-fog">Why Choose Us</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember/10 text-ember">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-fog">{title}</h3>
                <p className="mt-2 text-sm text-steel">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Vehicles */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Just arrived</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-fog">Latest Vehicles</h2>
          <div className="mt-8">
            {loading ? (
              <SkeletonGrid count={4} />
            ) : latest.length === 0 ? (
              <EmptyState title="Nothing new yet" message="New arrivals will appear here first." />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {latest.map((v) => (
                  <VehicleCard key={v._id} vehicle={v} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Word on the road</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-fog">Testimonials</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/5 bg-obsidian-2 p-6">
                <div className="flex gap-1 text-ember">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-steel-light">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-5 text-sm font-semibold text-fog">{t.name}</p>
                <p className="text-xs text-steel">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-ember/20 bg-gradient-to-br from-ember/15 via-obsidian-2 to-obsidian-2 p-10 text-center lg:p-16">
          <h2 className="font-display text-3xl font-bold text-fog lg:text-4xl">
            Ready to find your next drive?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-steel-light">
            Explore the full inventory and place an order in minutes — no dealership visit required.
          </p>
          <Link
            to="/vehicles"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ember px-7 py-3.5 text-sm font-semibold text-obsidian transition hover:bg-ember-light"
          >
            Explore Inventory <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

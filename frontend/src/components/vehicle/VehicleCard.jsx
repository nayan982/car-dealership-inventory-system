import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiDroplet,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

import { formatCurrency, formatMileage } from "../../utils/format";
import SpecPill from "./SpecPill";

const VehicleCard = ({
  vehicle: {
    _id,
    make,
    model,
    year,
    price,
    category,
    fuelType,
    transmission,
    mileage,
    seatingCapacity,
    image,
    quantity,
  },
}) => {
  const outOfStock = quantity <= 0;
  const imageAlt = `${year} ${make} ${model}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-obsidian-2 shadow-lg shadow-black/20 transition-shadow duration-300 hover:shadow-ember/10"
    >
      <div className="relative h-48 overflow-hidden bg-obsidian-3">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-obsidian/90 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 rounded-full bg-obsidian/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-signal backdrop-blur">
          {category}
        </span>

        {outOfStock && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            Out of Stock
          </span>
        )}
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold leading-tight text-fog">
              {make} {model}
            </h3>

            <p className="text-xs text-steel">{year}</p>
          </div>

          <p className="whitespace-nowrap font-display text-lg font-bold text-gradient">
            {formatCurrency(price)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <SpecPill icon={FiDroplet}>{fuelType}</SpecPill>
          <SpecPill icon={FiSettings}>{transmission}</SpecPill>
          <SpecPill icon={FiUsers}>{seatingCapacity} seats</SpecPill>
        </div>

        <p className="font-mono text-xs text-steel">
          {formatMileage(mileage)}
        </p>

        <Link
          to={`/vehicles/${_id}`}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-fog transition-colors duration-200 group-hover:border-ember/60 group-hover:bg-ember/10 group-hover:text-ember"
        >
          View Details
          <FiArrowUpRight size={15} />
        </Link>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
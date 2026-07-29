import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiDroplet,
  FiSettings,
  FiUsers,
  FiActivity,
  FiCalendar,
  FiTag,
  FiArrowLeft,
} from "react-icons/fi";
import RevLoader from "../components/common/RevLoader";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import SpecPill from "../components/vehicle/SpecPill";
import PurchaseModal from "../components/vehicle/PurchaseModal";
import { vehicleService } from "../services/vehicleService";
import { formatCurrency, formatMileage } from "../utils/format";
import { useAuth } from "../hooks/useAuth";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await vehicleService.getById(id);
        setVehicle(data?.vehicle || data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <RevLoader label="Loading vehicle" />;

  if (notFound || !vehicle) {
    return (
      <div className="px-5 py-24">
        <EmptyState
          title="We couldn't find that vehicle"
          message="It may have been sold or removed from the inventory."
          action={
            <Link to="/vehicles" className="text-sm font-medium text-ember hover:text-ember-light">
              Back to Vehicle Listing
            </Link>
          }
        />
      </div>
    );
  }

  const outOfStock = Number(vehicle.quantity) <= 0;

  const handlePurchaseClick = () => {
    if (!user) {
      toast("Log in to place an order.", { icon: "🔒" });
      navigate("/login", { state: { from: { pathname: `/vehicles/${id}` } } });
      return;
    }
    setModalOpen(true);
  };

  return (
    <div className="px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/vehicles" className="inline-flex items-center gap-2 text-sm text-steel hover:text-fog">
          <FiArrowLeft size={15} /> Back to Vehicles
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border bg-white border-white/10">
            <img
              src={vehicle.image}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="h-80 w-full object-contain lg:h-115 scale-125"
            />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-signal">
              <FiTag size={12} /> {vehicle.category}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold text-fog lg:text-4xl">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-steel">
              <FiCalendar size={14} /> {vehicle.year} · {vehicle.color}
            </p>

            <p className="mt-6 font-display text-3xl font-bold text-gradient">
              {formatCurrency(vehicle.price)}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-steel-light">
              {vehicle.description || "No description provided for this vehicle."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <SpecPill icon={FiDroplet}>{vehicle.fuelType}</SpecPill>
              <SpecPill icon={FiSettings}>{vehicle.transmission}</SpecPill>
              <SpecPill icon={FiUsers}>{vehicle.seatingCapacity} seats</SpecPill>
              <SpecPill icon={FiActivity}>{vehicle.engine}</SpecPill>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-white/5 bg-obsidian-2 p-5 sm:grid-cols-4">
              {[
                ["Year", vehicle.year],
                ["Mileage", formatMileage(vehicle.mileage)],
                ["Seats", vehicle.seatingCapacity],
                ["In Stock", vehicle.quantity],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-steel">{label}</p>
                  <p className="mt-1 font-display text-sm font-semibold text-fog">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              {outOfStock ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-center text-sm font-semibold text-red-400">
                  Out of Stock
                </div>
              ) : (
                <Button onClick={handlePurchaseClick} size="lg" className="w-full sm:w-auto cursor-pointer">
                  Purchase Vehicle
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <PurchaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        vehicle={vehicle}
        onSuccess={() => {
          setModalOpen(false);
          navigate("/my-orders");
        }}
      />
    </div>
  );
};

export default VehicleDetails;

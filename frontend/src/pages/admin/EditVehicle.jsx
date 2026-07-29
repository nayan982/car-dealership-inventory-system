import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import VehicleForm from "../../components/vehicle/VehicleForm";
import RevLoader from "../../components/common/RevLoader";
import EmptyState from "../../components/common/EmptyState";
import { vehicleService } from "../../services/vehicleService";

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
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

  const handleSubmit = async (values) => {
    try {
      await vehicleService.update(id, values);
      toast.success("Vehicle updated.");
      navigate("/admin/vehicles");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not update this vehicle.");
    }
  };

  if (loading) return <RevLoader label="Loading vehicle" />;
  if (notFound || !vehicle) {
    return <EmptyState title="Vehicle not found" message="It may have already been removed." />;
  }

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Inventory</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-fog">Edit Vehicle</h1>
      <div className="mt-8">
        <VehicleForm initialValues={vehicle} onSubmit={handleSubmit} submitLabel="Update Vehicle" />
      </div>
    </div>
  );
};

export default EditVehicle;

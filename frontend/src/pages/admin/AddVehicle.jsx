import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import VehicleForm from "../../components/vehicle/VehicleForm";
import { vehicleService } from "../../services/vehicleService";
import { VEHICLE_FORM_DEFAULTS } from "../../utils/constants";

const AddVehicle = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await vehicleService.create(values);
      toast.success("Vehicle added to inventory.");
      navigate("/admin/vehicles");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not add this vehicle.");
    }
  };

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Inventory</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-fog">Add Vehicle</h1>
      <div className="mt-8">
        <VehicleForm initialValues={VEHICLE_FORM_DEFAULTS} onSubmit={handleSubmit} submitLabel="Add Vehicle" />
      </div>
    </div>
  );
};

export default AddVehicle;

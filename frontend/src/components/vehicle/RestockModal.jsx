import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { vehicleService } from "../../services/vehicleService";
import { isPositiveNumber } from "../../utils/validators";

import Button from "../common/Button";
import Modal from "../common/Modal";
import FormField from "../dashboard/FormField";

const RestockModal = ({ open, onClose, vehicle, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setError("");
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = isPositiveNumber(quantity);
    setError(message);

    if (message) return;

    setSubmitting(true);

    try {
      await vehicleService.restock(vehicle._id, Number(quantity));

      toast.success("Inventory restocked.");

      onSuccess?.();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Could not restock this vehicle."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!vehicle) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Restock ${vehicle.make} ${vehicle.model}`}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <p className="text-sm text-steel">
          Current quantity:{" "}
          <span className="text-fog">
            {vehicle.quantity}
          </span>
        </p>

        <FormField
          label="Quantity to Add"
          name="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          error={error}
        />

        <Button
          type="submit"
          loading={submitting}
          className="w-full"
        >
          Update Quantity
        </Button>
      </form>
    </Modal>
  );
};

export default RestockModal;
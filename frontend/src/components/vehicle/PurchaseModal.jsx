import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { vehicleService } from "../../services/vehicleService";
import { PAYMENT_METHODS } from "../../utils/constants";
import { formatCurrency } from "../../utils/format";
import { required, runValidators } from "../../utils/validators";

import Button from "../common/Button";
import Modal from "../common/Modal";
import FormField from "../dashboard/FormField";

const initialValues = {
    deliveryAddress: "",
    phoneNumber: "",
    paymentMethod: PAYMENT_METHODS[0],
    quantity: 1,
};

const PurchaseModal = ({ open, onClose, vehicle, onSuccess }) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            setValues(initialValues);
            setErrors({});
        }
    }, [open]);

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setValues((prev) => ({
            ...prev,
            [name]: name === "quantity" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nextErrors = runValidators(values, {
            deliveryAddress: [required],
            phoneNumber: [required],
        });

        if (values.quantity < 1) {
            nextErrors.quantity = "Quantity must be at least 1.";
        }

        if (vehicle && values.quantity > vehicle.quantity) {
            nextErrors.quantity = `Only ${vehicle.quantity} in stock.`;
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length) return;

        const payload = {
            address: values.deliveryAddress,
            phone: values.phoneNumber,
            quantity: values.quantity,
            paymentMethod: values.paymentMethod,
        };

        setSubmitting(true);

        try {
            await vehicleService.purchase(vehicle._id, payload);

            toast.success("Order placed! Redirecting to My Orders...");

            onSuccess?.();
        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                "Could not place the order."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (!vehicle) return null;

    const total =
        (Number(vehicle.price) || 0) *
        (Number(values.quantity) || 0);

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={`Purchase ${vehicle.make} ${vehicle.model}`}
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <FormField
                    as="textarea"
                    label="Delivery Address"
                    name="deliveryAddress"
                    value={values.deliveryAddress}
                    onChange={handleChange}
                    error={errors.deliveryAddress}
                    placeholder="Street, city, state, ZIP"
                />

                <FormField
                    type="tel"
                    label="Phone Number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                    placeholder="98765 43210"
                    maxLength={10}
                    minLength={10}
                />

                <FormField
                    as="select"
                    label="Payment Method"
                    name="paymentMethod"
                    value={values.paymentMethod}
                    onChange={handleChange}
                >
                    {PAYMENT_METHODS.map((method) => (
                        <option key={method} value={method}>
                            {method}
                        </option>
                    ))}
                </FormField>

                <FormField
                    type="number"
                    label="Quantity"
                    name="quantity"
                    min={1}
                    max={vehicle.quantity}
                    value={values.quantity}
                    onChange={handleChange}
                    error={errors.quantity}
                />

                <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm">
                    <span className="text-steel">Total</span>

                    <span className="font-display font-semibold text-fog">
                        {formatCurrency(total)}
                    </span>
                </div>

                <Button
                    type="submit"
                    loading={submitting}
                    className="w-full cursor-pointer"
                >
                    Place Order
                </Button>
            </form>
        </Modal>
    );
};

export default PurchaseModal;
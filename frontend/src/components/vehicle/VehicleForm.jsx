import { useState } from "react";

import {
  CATEGORIES,
  FUEL_TYPES,
  TRANSMISSIONS,
} from "../../utils/constants";

import {
  required,
  isPositiveNumber,
  isNonNegativeNumber,
  validateYear,
  runValidators,
} from "../../utils/validators";

import Button from "../common/Button";
import FormField from "../dashboard/FormField";

const schema = {
  make: [required],
  model: [required],
  year: [validateYear],
  price: [required, isPositiveNumber],
  quantity: [required, isNonNegativeNumber],
  color: [required],
  engine: [required],
  mileage: [required, isNonNegativeNumber],
  seatingCapacity: [required, isPositiveNumber],
  image: [required],
  description: [required],
};

const VehicleForm = ({
  initialValues,
  onSubmit,
  submitLabel = "Save Vehicle",
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageError = (e) => {
    e.currentTarget.style.display = "none";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = runValidators(values, schema);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);

    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-8 lg:grid-cols-3"
    >
      <div className="space-y-5 lg:col-span-2">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label="Make"
            name="make"
            value={values.make}
            onChange={handleChange}
            error={errors.make}
            placeholder="Toyota"
          />

          <FormField
            label="Model"
            name="model"
            value={values.model}
            onChange={handleChange}
            error={errors.model}
            placeholder="Camry"
          />

          <FormField
            label="Year"
            name="year"
            type="number"
            value={values.year}
            onChange={handleChange}
            error={errors.year}
            placeholder="2024"
          />

          <FormField
            as="select"
            label="Category"
            name="category"
            value={values.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </FormField>

          <FormField
            label="Price (₹)"
            name="price"
            type="number"
            value={values.price}
            onChange={handleChange}
            error={errors.price}
          />

          <FormField
            label="Quantity"
            name="quantity"
            type="number"
            value={values.quantity}
            onChange={handleChange}
            error={errors.quantity}
          />

          <FormField
            label="Color"
            name="color"
            value={values.color}
            onChange={handleChange}
            error={errors.color}
          />

          <FormField
            as="select"
            label="Fuel Type"
            name="fuelType"
            value={values.fuelType}
            onChange={handleChange}
          >
            {FUEL_TYPES.map((fuel) => (
              <option
                key={fuel}
                value={fuel}
              >
                {fuel}
              </option>
            ))}
          </FormField>

          <FormField
            as="select"
            label="Transmission"
            name="transmission"
            value={values.transmission}
            onChange={handleChange}
          >
            {TRANSMISSIONS.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </FormField>

          <FormField
            label="Engine"
            name="engine"
            value={values.engine}
            onChange={handleChange}
            error={errors.engine}
          />

          <FormField
            label="Mileage"
            name="mileage"
            type="number"
            value={values.mileage}
            onChange={handleChange}
            error={errors.mileage}
          />

          <FormField
            label="Seating Capacity"
            name="seatingCapacity"
            type="number"
            value={values.seatingCapacity}
            onChange={handleChange}
            error={errors.seatingCapacity}
          />
        </div>

        <FormField
          label="Image URL"
          name="image"
          value={values.image}
          onChange={handleChange}
          error={errors.image}
          placeholder="https://..."
        />

        <FormField
          as="textarea"
          label="Description"
          name="description"
          value={values.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="Describe the vehicle's condition, history, and standout features..."
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-wide text-steel">
          Image Preview
        </p>

        <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-obsidian-3">
          {values.image ? (
            <img
              src={values.image}
              alt="Vehicle preview"
              className="h-full w-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-steel">
              Paste an image URL to preview
            </div>
          )}
        </div>

        <Button
          type="submit"
          loading={submitting}
          className="w-full"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default VehicleForm;
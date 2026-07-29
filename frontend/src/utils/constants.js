export const CATEGORIES = ["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Hatchback", "Electric", "Luxury"];

export const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];

export const TRANSMISSIONS = ["Automatic", "Manual", "CVT", "Dual-Clutch"];

export const ORDER_STATUSES = ["Pending", "Confirmed", "Delivered", "Cancelled"];

export const PAYMENT_METHODS = ["Cash on Delivery"];

export const VEHICLE_FORM_DEFAULTS = {
  make: "",
  model: "",
  year: "",
  category: CATEGORIES[0],
  price: "",
  quantity: "",
  color: "",
  fuelType: FUEL_TYPES[0],
  transmission: TRANSMISSIONS[0],
  engine: "",
  mileage: "",
  seatingCapacity: "",
  image: "",
  description: "",
};

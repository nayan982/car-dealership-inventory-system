export const required = (value) =>
  value === undefined || value === null || String(value).trim() === ""
    ? "This field is required."
    : "";

export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address.";

export const minLength = (min) => (value) =>
  String(value || "").length < min ? `Must be at least ${min} characters.` : "";

export const isPositiveNumber = (value) =>
  Number(value) > 0 ? "" : "Enter a value greater than zero.";

export const isNonNegativeNumber = (value) =>
  Number(value) >= 0 ? "" : "Enter a value of zero or more.";

export const validateYear = (value) => {
  const year = Number(value);
  const currentYear = new Date().getFullYear();
  if (!year) return "Enter a valid year.";
  if (year < 1980 || year > currentYear + 1) return `Year must be between 1980 and ${currentYear + 1}.`;
  return "";
};

export const runValidators = (values, schema) => {
  const errors = {};
  for (const field of Object.keys(schema)) {
    for (const validator of schema[field]) {
      const message = validator(values[field]);
      if (message) {
        errors[field] = message;
        break;
      }
    }
  }
  return errors;
};

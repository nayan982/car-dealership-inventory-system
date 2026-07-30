export const formatCurrency = (value) => {
  const num = Number(value) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatMileage = (value) => {
  const num = Number(value) || 0;
  return `${new Intl.NumberFormat("en-IN").format(num)} km`;
};

export const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const statusColors = {
  Pending: "bg-yellow-400/15 text-yellow-300 border-yellow-400/30",
  Confirmed: "bg-sky-400/15 text-sky-300 border-sky-400/30",
  Shipped: "bg-indigo-400/15 text-indigo-300 border-indigo-400/30",
  Delivered: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  Cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

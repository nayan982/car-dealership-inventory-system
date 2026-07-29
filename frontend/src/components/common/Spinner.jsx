const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
};

const Spinner = ({ size = "md", className = "" }) => {
  const spinnerSize = sizes[size] || sizes.md;

  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block ${spinnerSize} rounded-full border-ember/30 border-t-ember animate-spin ${className}`}
    />
  );
};

export default Spinner;
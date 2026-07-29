const RevLoader = ({ label = "Loading" }) => {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 py-16">
      <svg
        width="72"
        height="72"
        viewBox="0 0 80 80"
        className="animate-rev"
      >
        <circle
          cx="40"
          cy="40"
          r="32"
          fill="none"
          stroke="#1c1e22"
          strokeWidth="6"
        />

        <circle
          cx="40"
          cy="40"
          r="32"
          fill="none"
          stroke="#ff5a36"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="180 226"
          strokeDashoffset="150"
          transform="rotate(-90 40 40)"
        />
      </svg>

      <p className="font-mono text-xs uppercase tracking-[0.3em] text-steel">
        {label}
      </p>
    </div>
  );
};

export default RevLoader;
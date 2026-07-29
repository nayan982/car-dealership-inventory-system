const SpecPill = ({ icon: Icon, children }) => {
  const className =
    "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-steel-light";

  return (
    <span className={className}>
      {Icon && (
        <Icon
          size={12}
          className="text-ember"
        />
      )}

      {children}
    </span>
  );
};

export default SpecPill;
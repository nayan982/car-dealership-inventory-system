const StatCard = ({
  icon: Icon,
  label,
  value,
  accent = "text-ember",
}) => {
  const iconClass = `flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ${accent}`;

  return (
    <div className="rounded-2xl border border-white/5 bg-obsidian-2 p-6">
      <div className={iconClass}>
        <Icon size={20} />
      </div>

      <p className="mt-4 font-display text-2xl font-bold text-fog">
        {value}
      </p>

      <p className="mt-1 text-xs uppercase tracking-wide text-steel">
        {label}
      </p>
    </div>
  );
};

export default StatCard;
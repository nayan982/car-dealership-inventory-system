const FormField = ({
  label,
  name,
  error,
  as = "input",
  children,
  className = "",
  ...props
}) => {
  const Tag = as;

  const inputClass = `
    w-full rounded-xl border bg-obsidian-3
    px-4 py-2.5 text-sm text-fog
    outline-none transition focus:border-ember/60
    ${error ? "border-red-500/60" : "border-white/10"}
    ${as !== "select" ? "placeholder:text-steel/60" : ""}
    ${as === "textarea" ? "min-h-[100px] resize-y" : ""}
  `;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-steel"
        >
          {label}
        </label>
      )}

      <Tag
        id={name}
        name={name}
        className={inputClass}
        {...props}
      >
        {as === "select" ? children : null}
      </Tag>

      {error && (
        <p className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
import Spinner from "./Spinner";

const variants = {
  primary:
    "bg-ember text-obsidian hover:bg-ember-light shadow-[0_0_0_1px_rgba(255,90,54,0.4),0_8px_24px_-8px_rgba(255,90,54,0.5)]",
  secondary: "glass text-fog hover:bg-white/10",
  ghost: "text-fog hover:bg-white/5",
  danger: "bg-red-500/90 text-white hover:bg-red-500",
  outline:
    "border border-white/15 text-fog hover:border-ember/60 hover:text-ember",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  className = "",
  type = "button",
  ...props
}) => {
  const isDisabled = disabled || loading;

  const buttonClass = `
    inline-flex items-center justify-center gap-2
    rounded-xl font-medium tracking-tight
    transition-all duration-200 ease-out
    disabled:cursor-not-allowed disabled:opacity-50
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={buttonClass}
      {...props}
    >
      {loading && <Spinner size="sm" />}

      {!loading && Icon && iconPosition === "left" && <Icon />}

      {children}

      {!loading && Icon && iconPosition === "right" && <Icon />}
    </button>
  );
};

export default Button;
/**
 * Reusable button aligned with app/design-system.css (ds-btn variants).
 */
export function Button({
  variant = "primary",
  className = "",
  type = "button",
  children,
  ...rest
}) {
  const variants = {
    primary: "ds-btn ds-btn-primary",
    secondary: "ds-btn ds-btn-secondary",
    ghost: "ds-btn ds-btn-ghost",
  };
  const v = variants[variant] || variants.primary;
  return (
    <button type={type} className={`${v} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}

/**
 * Reusable card wrapper for consistent radius/shadow/spacing.
 */
export function Card({
  as: Tag = "div",
  interactive = false,
  className = "",
  children,
  ...rest
}) {
  const base = interactive ? "ds-card" : "ds-card-static";
  return (
    <Tag className={`${base} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

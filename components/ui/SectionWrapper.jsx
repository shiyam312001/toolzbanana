/**
 * Standardized section wrapper for consistent vertical rhythm.
 */
export function SectionWrapper({
  id,
  className = "",
  padded = "default",
  children,
}) {
  const padClass =
    padded === "large"
      ? "py-16 lg:py-20"
      : padded === "small"
        ? "py-10 lg:py-12"
        : "py-12 lg:py-16";

  return (
    <section id={id} className={`${padClass} ${className}`.trim()}>
      <div className="ds-container">{children}</div>
    </section>
  );
}

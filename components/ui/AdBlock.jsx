/**
 * Reusable ad placeholder block.
 */
export function AdBlock({
  size = "728x90",
  className = "",
  title = "Advertisement",
}) {
  const dims = {
    "728x90": "w-full max-w-[728px] h-[90px]",
    "300x250": "w-full max-w-[300px] h-[250px]",
    "300x600": "w-full max-w-[300px] h-[600px]",
  };
  const sizeClass = dims[size] || dims["728x90"];

  return (
    <div className={`mx-auto ${sizeClass} ${className}`.trim()}>
      <div className="ds-adblock h-full w-full p-3">
        <div>
          <span className="ds-adblock-label">{title}</span>
          <div className="text-sm font-semibold text-ds-text-secondary">
            Ad Space
          </div>
          <div className="mt-1 text-xs">{size}</div>
        </div>
      </div>
    </div>
  );
}

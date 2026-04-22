export function IconBox({ icon: Icon, color, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  return (
    <div
      className={`${sizes[size]} rounded-xl flex items-center justify-center ${className}`}
      style={{ backgroundColor: color ? `${color}15` : undefined }}
    >
      <Icon className={iconSizes[size]} style={{ color }} />
    </div>
  );
}

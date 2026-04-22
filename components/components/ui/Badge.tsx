export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-gray-100 text-gray-600',
    primary: 'bg-yellow-100 text-yellow-700',
    trending: 'bg-yellow-100 text-yellow-700',
    success: 'bg-green-100 text-green-700',
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full inline-flex items-center gap-1 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

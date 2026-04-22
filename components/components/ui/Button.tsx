export function Button({ children, variant = 'primary', size = 'md', className = '', onClick, type = 'button', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#FFC107] hover:bg-[#FFD54F] text-[#101828] shadow-lg hover:shadow-xl',
    secondary: 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-gray-200 hover:border-[#FFC107] hover:bg-[#FFC107]/10 text-gray-900',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-900',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4',
    lg: 'px-10 py-5 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

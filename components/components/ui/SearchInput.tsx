import { Search } from 'lucide-react';

export function SearchInput({
  placeholder = 'Search...',
  value,
  onChange,
  onSubmit,
  animated = false,
  className = ''
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex items-center bg-white rounded-2xl shadow-lg shadow-[#FFC107]/10 border border-[#FFC107]/20 p-1.5">
        <div className="flex items-center flex-1 px-4">
          <Search className="w-5 h-5 text-[#999] mr-3 shrink-0" />
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-transparent border-none outline-none w-full text-[#111] placeholder-[#999] py-2"
            style={{ fontSize: '1rem' }}
          />
        </div>
        <button
          type="submit"
          className="bg-[#FFC107] text-[#111] px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:bg-[#FFD54F] transition-all shrink-0"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}

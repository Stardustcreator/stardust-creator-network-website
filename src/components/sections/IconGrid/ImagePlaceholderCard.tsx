interface ImagePlaceholderCardProps {
  title?: string;
  description?: string;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function ImagePlaceholderCard({
  title = 'Community Preview',
  description = 'Coming Soon',
  placeholder = '🎨',
  size = 'medium',
  className = '',
}: ImagePlaceholderCardProps) {
  const sizeClasses = {
    small: 'w-20 h-20 text-2xl',
    medium: 'w-32 h-32 text-4xl',
    large: 'w-48 h-48 text-6xl',
  };

  const cardSizeClasses = {
    small: 'p-4 max-w-xs',
    medium: 'p-6 max-w-sm',
    large: 'p-8 max-w-md',
  };

  return (
    <div
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl ${cardSizeClasses[size]} hover:bg-white/10 transition-all duration-300 group ${className}`}
    >
      {/* Image Placeholder */}
      <div className="flex justify-center mb-4">
        <div
          className={`${sizeClasses[size]} bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300`}
        >
          <span className="text-white font-bold select-none">{placeholder}</span>
        </div>
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-white font-bold text-lg md:text-xl mb-2 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      {/* Animated border glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10"></div>
    </div>
  );
}

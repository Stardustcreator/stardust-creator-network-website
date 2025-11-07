import type { CreatorProfileCardProps } from './CreatorProfileCard.types';

export default function CreatorProfileCard({
  name,
  handle,
  followers,
  engagement,
  category,
  imagePlaceholder,
  size = 'medium',
  showStats = true,
}: CreatorProfileCardProps) {
  const sizeClasses = {
    small: 'w-16 h-16 text-xl',
    medium: 'w-24 h-24 text-3xl',
    large: 'w-32 h-32 text-4xl',
  };

  const cardSizeClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  return (
    <div
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl ${cardSizeClasses[size]} hover:bg-white/10 transition-all duration-300 group`}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className={`${sizeClasses[size]} bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 shadow-lg`}
        >
          {imagePlaceholder || name.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-lg md:text-xl truncate group-hover:text-purple-400 transition-colors">
            {name}
          </h3>
          {handle && <p className="text-gray-400 text-sm truncate">@{handle}</p>}
          {category && (
            <span className="inline-block mt-2 px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      {showStats && (
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
          <div>
            <div className="text-white font-bold text-lg">{followers}</div>
            <div className="text-gray-400 text-xs">Followers</div>
          </div>
          {engagement && (
            <div>
              <div className="text-white font-bold text-lg">{engagement}</div>
              <div className="text-gray-400 text-xs">Engagement</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

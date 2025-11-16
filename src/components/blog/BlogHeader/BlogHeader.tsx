interface BlogHeaderProps {
  className?: string;
}

export default function BlogHeader({ className = '' }: BlogHeaderProps) {
  return (
    <div className={`relative py-20 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Creator Insights
          </span>
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Expert insights, strategies, and stories from the forefront of the creator economy. Learn
          how to build authentic partnerships, grow your brand, and thrive as a creator.
        </p>
      </div>
    </div>
  );
}

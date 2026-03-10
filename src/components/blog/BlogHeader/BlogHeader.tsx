interface BlogHeaderProps {
  className?: string;
}

export default function BlogHeader({ className = '' }: BlogHeaderProps) {
  return (
    <div className={`container-section text-center ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          <span className="text-gradient">Creator Insights</span>
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Expert insights, strategies, and stories from the forefront of the creator economy. Learn
          how to build authentic partnerships, grow your brand, and thrive as a creator in today's
          digital landscape.
        </p>

        {/* Additional descriptive content */}
        <div className="flex flex-wrap justify-center gap-8 mt-8 text-white/70">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">50+</div>
            <div className="text-sm">Expert Articles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">10+</div>
            <div className="text-sm">Industry Topics</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">Weekly</div>
            <div className="text-sm">New Content</div>
          </div>
        </div>

        <p className="text-white/60 text-sm mt-8 max-w-3xl mx-auto">
          From monetization strategies and brand partnership best practices to creative campaign
          ideas and industry trends, our blog provides actionable insights to help creators and
          brands succeed in the evolving creator economy. Stay informed with the latest developments
          in influencer marketing, content creation, and digital branding.
        </p>
      </div>
    </div>
  );
}

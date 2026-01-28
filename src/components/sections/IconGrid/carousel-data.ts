export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  placeholder: string;
  features: string[];
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  image?: string;
  images?: string[];
  alt?: string;
}

export const carouselSlides: CarouselSlide[] = [
  {
    id: 'learning-hub',
    title: 'Learning Hub',
    subtitle: 'Educational Resources',
    placeholder: 'LH',
    features: [
      'Access exclusive courses on content strategy, audience growth, and brand partnerships',
      'Learn from industry experts through live workshops and masterclasses',
      'Download actionable templates, guides, and playbooks for creator success',
      'Stay updated with the latest trends and platform algorithm insights',
    ],
    gradientFrom: 'from-purple-500',
    gradientVia: 'via-pink-500',
    gradientTo: 'to-orange-500',
    image: '/creator community/learning-hub.webp',
    alt: 'UK content creators exploring tools and resources in the creator community for growth and creator monetization',
  },
  {
    id: 'creator-network',
    title: 'Creator Network',
    subtitle: 'Community Connections',
    placeholder: 'CN',
    features: [
      'Connect with like-minded creators in a private, growth-focused community',
      'Collaborate on joint projects and cross-promotional opportunities',
      'Share insights, challenges, and wins in a supportive peer environment',
      'Get matched with collaboration partners based on your niche and goals',
    ],
    gradientFrom: 'from-blue-500',
    gradientVia: 'via-purple-500',
    gradientTo: 'to-pink-500',
    image: '/creator community/creator-network.webp',
    alt: 'Friends taking photos together at a creator community event, celebrating collaboration and networking',
  },
  {
    id: 'growth-tools',
    title: 'Growth Tools',
    subtitle: 'Monetization Playbooks',
    placeholder: 'GT',
    features: [
      'Access proven monetization strategies from successful creators',
      'Use advanced analytics tools to track your growth and engagement metrics',
      'Get personalized recommendations for brand partnership opportunities',
      'Learn how to diversify income streams and build sustainable creator businesses',
    ],
    gradientFrom: 'from-green-500',
    gradientVia: 'via-emerald-500',
    gradientTo: 'to-teal-500',
    image: '/creator community/growth tools.webp',
    alt: 'Happy content creator enjoying music while engaging with the creative ecosystem',
  },
];

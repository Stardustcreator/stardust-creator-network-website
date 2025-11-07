export interface CreatorProfileCardProps {
  name: string;
  handle?: string;
  followers: string;
  engagement?: string;
  category?: string;
  imagePlaceholder?: string;
  size?: 'small' | 'medium' | 'large';
  showStats?: boolean;
}

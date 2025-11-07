interface SectionNumberProps {
  number: string;
  className?: string;
}

export default function SectionNumber({ number, className = '' }: SectionNumberProps) {
  return <div className={`section-number ${className}`}>({number})</div>;
}

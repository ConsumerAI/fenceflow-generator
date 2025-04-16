import React from 'react';

const avatars = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces&q=80",
    alt: "Happy customer"
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces&q=80",
    alt: "Happy customer"
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=faces&q=80",
    alt: "Happy customer"
  }
];

interface SocialProofProps {
  className?: string;
}

const SocialProof: React.FC<SocialProofProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex -space-x-2">
        {avatars.map((avatar, index) => (
          <img 
            key={index}
            src={avatar.src} 
            alt={avatar.alt} 
            className="w-8 h-8 rounded-full border-2 border-white object-cover" 
          />
        ))}
      </div>
      <span className="text-muted-foreground ml-2">73 Perfect Fence Matches Made This Week!</span>
    </div>
  );
};

export default SocialProof; 
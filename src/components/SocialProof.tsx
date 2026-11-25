import React from 'react';

// Wave 1: the Unsplash stock face avatars were removed. Stock faces next to
// social-proof copy imply real customers we cannot name; the honest
// non-numerical line stays on its own.
interface SocialProofProps {
  className?: string;
}

const SocialProof: React.FC<SocialProofProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="text-muted-foreground">Homeowners across DFW get matched with local fence pros</span>
    </div>
  );
};

export default SocialProof;

"use client";

import Image from "next/image";

interface SocialIconsProps {
  className?: string;
  iconSize?: number;
}

const SocialIcons = ({ className = "", iconSize = 20 }: SocialIconsProps) => {
  const iconClasses = "text-muted-foreground hover:text-purple transition-colors duration-300";

  return (
    <div className={`flex gap-4 ${className}`}>
      <a href="https://github.com/sanda0" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconClasses}>
        <Image src="/images/github.png" width={iconSize} height={iconSize} alt="GitHub" />
      </a>
      <a href="https://www.fiverr.com/sandakelum115" target="_blank" rel="noopener noreferrer" aria-label="Fiverr" className={iconClasses}>
        <Image src="/images/fiverr.png" width={iconSize} height={iconSize} alt="Fiverr" />
      </a>
      <a href="https://www.youtube.com/@sanda_0" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={iconClasses}>
        <Image src="/images/yt.png" width={iconSize} height={iconSize} alt="YouTube" />
      </a>
      <a href="https://medium.com/@sandakelum" target="_blank" rel="noopener noreferrer" aria-label="Medium" className={iconClasses}>
        <Image src="/images/medium.png" width={iconSize} height={iconSize} alt="Medium" />
      </a>
      <a href="mailto:sandakelum.work@gmail.com" aria-label="Email" className={iconClasses}>
        <Image src="/images/gmail.webp" width={iconSize} height={iconSize} alt="Gmail" />
      </a>
      <a href="https://www.linkedin.com/in/sandakelum-priyamantha" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconClasses}>
        <Image src="/images/Li.png" width={iconSize} height={iconSize} alt="LinkedIn" />
      </a>
    </div>
  );
};

export default SocialIcons;


import Link from "next/link";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-background/80 border-t border-white/10 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              Sandakelum<span className="text-purple-400">.</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              Self-taught Software Engineer
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <SocialIcons />
            <p className="text-muted-foreground text-sm mt-4">
              © {new Date().getFullYear()} Sandakelum. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

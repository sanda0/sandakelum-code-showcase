
import SocialIcons from "../components/SocialIcons";
import Link from "next/link";
const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I&apos;m <span className="text-purple-400">Sandakelum</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
              Self-taught Software Engineer
            </h2>

            <div className="prose prose-invert max-w-2xl mb-8">
              <p className="text-lg">
                I&apos;m a self-taught software engineer with experience in building browser extensions, scalable backend services using Golang, Python (FastAPI, Django), and Laravel, as well as full-stack Laravel applications. I also work with React and Vue.js for UI development. My projects often include WebSocket services, REST APIs, and cloud-based tools, many of which are shared on GitHub and Fiverr. Additionally, I create YouTube tutorials and write Medium articles to share knowledge and support the developer community.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/projects" className="btn btn-primary">
                View My Work
              </Link>
              <a
                href="https://www.youtube.com/@sanda_0"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Watch on YouTube
              </a>
              <a
                href="https://medium.com/@sandakelum"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Read Articles
              </a>
              <Link href="/contact" className="btn btn-outline">
                Hire Me
              </Link>
            </div>

            {/* Social Icons */}
            <SocialIcons iconSize={24} />
          </div>
        </div>
      </section>

      {/* Tech Skills Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Tech Stack</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">


            
            <SkillCard title="Backend Development" description="Golang, Python (FastAPI, Django), Laravel, PostgreSQL, MySQL, MongoDB" />
            <SkillCard title="Full-stack Web Development" description="Laravel, PHP, MySQL, PostgreSQL, MongoDB React, Vue.js" />
            <SkillCard title="Frontend & UI Development" description="React, Vue.js, Tailwind CSS, HTML, JavaScript" />
            <SkillCard title="Browser Extensions" description="JavaScript, TypeScript, Chrome APIs, Firefox APIs" />
            <SkillCard title="Developer Tools" description="Shell scripting, CLI tools, automation scripts" />
        

          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
            <Link href="/projects" className="text-purple hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="Linodsync"
              description="Linodsync is a Go-based application designed to back up your project directories and databases on a server to Linode Object Storage."
              tech={["Golang","S3"]}
            />
            <ProjectCard
              title="SiteTimer(beta)"
              description="SiteTimer is a browser extension that helps users track time spent on websites, set daily limits, and block access once time is up. With a 7-day browsing history feature, it enhances productivity by managing online habits effectively. 🚀"
              tech={["TypeScript", "React", "Chrome API"]}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface SkillCardProps {
  title: string;
  description: string;
}

const SkillCard = ({ title, description }: SkillCardProps) => {
  return (
    <div className="glass-card p-6 h-full">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
}

const ProjectCard = ({ title, description, tech }: ProjectCardProps) => {
  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {tech.map((item, index) => (
          <span
            key={index}
            className="bg-secondary text-xs py-1 px-2 rounded-md"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;

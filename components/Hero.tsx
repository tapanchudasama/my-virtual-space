import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaTwitter,
} from "react-icons/fa";

export type HeroProps = {
  name: string;
  description: string;
  mail: string;
  twitter: string;
  linkedin: string;
  github: string;
  reddit: string;
};

const Hero = ({
  mail,
  twitter,
  linkedin,
  github,
  reddit,
  name,
  description,
}: HeroProps) => {
  return (
    <main className="container relative">
      <div className="flex flex-col w-full h-screen flex-1 justify-center mt-8">
        <p className="text-lg md:text-xl xl:text-2xl">hi, i am</p>
        <div className="space-y-3">
          <p className="text-4xl md:text-5xl xl:text-6xl leading-tight font-bold">
            {name}
          </p>
          <p className="text-lg md:text-xl xl:text-2xl">{description}</p>
          <div className="flex space-x-6 py-2">
            {twitter && (
              <a
                aria-label="Twitter"
                rel="noreferrer"
                key="twitter"
                href={twitter}
                target="_blank"
              >
                <FaTwitter className="w-6 h-6 xl:w-8 xl:h-8" />
              </a>
            )}
            {linkedin && (
              <a
                aria-label="LinkedIn"
                rel="noreferrer"
                key="linkedin"
                href={linkedin}
                target="_blank"
              >
                <FaLinkedin className="w-6 h-6 xl:w-8 xl:h-8" />
              </a>
            )}
            {github && (
              <a
                aria-label="GitHub"
                rel="noreferrer"
                key="github"
                href={github}
                target="_blank"
              >
                <FaGithub className="w-6 h-6 xl:w-8 xl:h-8" />
              </a>
            )}
            {reddit && (
              <a
                aria-label="Reddit"
                rel="noreferrer"
                key="reddit"
                href={reddit}
                target="_blank"
              >
                <FaReddit className="w-6 h-6 xl:w-8 xl:h-8" />
              </a>
            )}

            {mail && (
              <a
                aria-label="mail"
                rel="noreferrer"
                key="mail"
                href={`mailto:${mail}`}
                target="_blank"
              >
                <FaEnvelope className="w-6 h-6 xl:w-8 xl:h-8" />
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;

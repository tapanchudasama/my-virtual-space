import Image from "next/image";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaTwitter,
} from "react-icons/fa";

const Hero = () => {
  return (
    <main className="hidden md:block container mt-16">
      <div className="flex w-full flex-1 items-center space-x-8">
        <div>
          <Image
            width="200"
            height="200"
            alt="my picture"
            src="/images/me.png"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-5xl lg:text-6xl leading-tight font-bold">
            tapan chudasama
          </p>
          <p className="font-sans text-lg md:text-md xl:text-xl">
            amore. inquisitive.
          </p>
        </div>
        {/* <p className="text-lg md:text-xl xl:text-2xl">
          {SideMetadata.description}
        </p>
        <div className="flex space-x-6 py-2">
          {SocialMediaLinks.twitter && (
            <a
              aria-label="Twitter"
              rel="noreferrer"
              key="twitter"
              href={SocialMediaLinks.twitter}
              target="_blank"
            >
              <FaTwitter className="w-6 h-6 xl:w-8 xl:h-8" />
            </a>
          )}
          {SocialMediaLinks.linkedin && (
            <a
              aria-label="LinkedIn"
              rel="noreferrer"
              key="linkedin"
              href={SocialMediaLinks.linkedin}
              target="_blank"
            >
              <FaLinkedin className="w-6 h-6 xl:w-8 xl:h-8" />
            </a>
          )}
          {SocialMediaLinks.github && (
            <a
              aria-label="GitHub"
              rel="noreferrer"
              key="github"
              href={SocialMediaLinks.github}
              target="_blank"
            >
              <FaGithub className="w-6 h-6 xl:w-8 xl:h-8" />
            </a>
          )}
          {SocialMediaLinks.reddit && (
            <a
              aria-label="Reddit"
              rel="noreferrer"
              key="reddit"
              href={SocialMediaLinks.reddit}
              target="_blank"
            >
              <FaReddit className="w-6 h-6 xl:w-8 xl:h-8" />
            </a>
          )}

          {SocialMediaLinks.mail && (
            <a
              aria-label="mail"
              rel="noreferrer"
              key="mail"
              href={`mailto:${SocialMediaLinks.mail}`}
              target="_blank"
            >
              <FaEnvelope className="w-6 h-6 xl:w-8 xl:h-8" />
            </a>
          )}
        </div> */}
      </div>
    </main>
  );
};

export default Hero;

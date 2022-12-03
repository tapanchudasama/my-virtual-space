import Image from "next/image";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaTwitter,
} from "react-icons/fa";
import SiteMetadata from "../content/site_metadata.json";

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
            {SiteMetadata.description}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Hero;

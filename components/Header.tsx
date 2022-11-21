import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteMetadata from "../content/site_metadata.json";

const Header = () => {
  const router = useRouter();

  return (
    <header>
      <div className="container font-sans flex flex-col md:flex-row items-start md:items-center md:space-x-16 space-y-8 md:space-y-0 py-6">
        <div className="flex flex-row space-x-8">
          <div className="mt-4">
            <Image
              onClick={() => router.push("/")}
              width="36px"
              height="36px"
              layout="fixed"
              alt="my picture"
              className="cursor-pointer"
              src="/images/me.png"
            />
          </div>
          <div className="md:hidden flex flex-col space-y-2">
            <p className="text-4xl leading-tight font-bold font-serif">
              tapan chudasama
            </p>
            <p className="font-sans text-md"> {SiteMetadata.description}</p>
          </div>
        </div>
        <div className="flex flex-row space-x-8">
          <Link href="/blog">
            <p className="font-bold text-xl border-b border-white cursor-pointer hover:text-blue-400 hover:border-blue-400">
              blog
            </p>
          </Link>
          <Link href="/reads">
            <p className="font-bold text-xl border-b border-white cursor-pointer hover:text-blue-400 hover:border-blue-400">
              reads
            </p>
          </Link>
          <Link href="/now">
            <p className="font-bold text-xl border-b border-white cursor-pointer hover:text-blue-400 hover:border-blue-400">
              now
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

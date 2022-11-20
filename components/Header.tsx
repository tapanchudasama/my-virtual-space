import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <header>
      <div className="container font-sans flex flex-col md:flex-row items-start md:items-center md:space-x-16 space-y-8 md:space-y-0 py-6">
        <div className="flex flex-row space-x-8">
          <div className="w-10 h-10">
            <Image
              onClick={() => router.push("/")}
              width="100%"
              height="100%"
              alt="my picture"
              className="cursor-pointer"
              src="/images/me.png"
            />
          </div>
          <div className="md:hidden flex flex-col space-y-2">
            <p className="text-2xl leading-tight font-bold">tapan chudasama</p>
            <p className="font-sans text-md">amore. inquisitive.</p>
          </div>
        </div>
        <div className="flex flex-row space-x-8">
          <Link href="/blog">
            <p className="font-bold text-xl hover:underline cursor-pointer hover:text-blue-300">
              blog
            </p>
          </Link>
          <Link href="/reads">
            <p className="font-bold text-xl hover:underline cursor-pointer hover:text-blue-300">
              reads
            </p>
          </Link>
          <Link href="/now">
            <p className="font-bold text-xl hover:underline cursor-pointer hover:text-blue-300">
              now
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

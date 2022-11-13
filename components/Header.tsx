import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <header>
      <div className="container font-sans flex items-center space-x-16 py-6">
        <Image
          onClick={() => router.push("/")}
          width="32"
          height="32"
          alt="my picture"
          className="cursor-pointer"
          src="/images/me.png"
        />
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
        <Link href="/side-projects">
          <p className="font-bold text-xl hover:underline cursor-pointer hover:text-blue-300">
            side projects
          </p>
        </Link>
        <Link href="/now">
          <p className="font-bold text-xl hover:underline cursor-pointer hover:text-blue-300">
            now
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;

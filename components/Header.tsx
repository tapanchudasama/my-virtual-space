import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div>
        <div className="pt-6">
          <Link href="/">
            <p className="cursor-pointer text-xl hover:underline hover:text-blue-400 inline font-serif font-bold">
              go to index
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const getGoToString = () => {
    const arr = router.pathname.split("/");
    if (arr.length <= 2) {
      return "/index";
    }
    return "/" + arr[1];
  };
  return (
    <header>
      <div className="pt-6">
        <p
          onClick={() => router.back()}
          className="cursor-pointer text-xl hover:underline hover:text-blue-400 inline font-bold text-right w-full"
        >
          go to {getGoToString()}
        </p>
      </div>
    </header>
  );
};

export default Header;

import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link
        href="/"
        className="text-xl font-bold text-gray-900 dark:text-white"
      >
        🐾 Pet Explorer
      </Link>
    </div>
  );
};

export default Logo;

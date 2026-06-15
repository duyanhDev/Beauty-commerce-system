import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="logo">
      <span className="logo-icon">✿</span>
      <div className="logo-text">
        <span className="logo-main">Sora Beauty</span>
        <span className="logo-sub text-black dark:text-white">BEAUTY</span>
      </div>
    </Link>
  );
}

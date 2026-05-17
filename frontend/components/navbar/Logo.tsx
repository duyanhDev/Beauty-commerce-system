import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="logo">
      <span className="logo-icon">✿</span>
      <div className="logo-text">
        <span className="logo-main">LUMIÈRE</span>
        <span className="logo-sub">BEAUTY</span>
      </div>
    </Link>
  );
}

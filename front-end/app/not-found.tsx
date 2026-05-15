import { Toaster } from "sonner";
import Navbar from "./navbar/Navbar";
import AuthProvider from "./providers/AuthProvider";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="h-26 lg:h-25" />
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        aria-hidden="true"
      >
        <span className="text-[120px] font-light text-stone-200 leading-none">
          404
        </span>
        <p className="text-stone-500 text-lg tracking-wide">
          Trang không tồn tại
        </p>
        <a
          href="/"
          className="px-6 py-2.5 rounded-full bg-emerald-600 text-white text-sm hover:bg-emerald-700"
        >
          Về trang chủ
        </a>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "./slider.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import item_1 from "@/public/Images/banner_2.png";
import item_2 from "@/public/Images/banner_3.png";
import item_3 from "@/public/Images/banner_1.png";
import Image from "next/image";
import { QrCode } from "lucide-react";

import icon_1 from "@/public/Images/1.png";

import icon_2 from "@/public/Images/2.png";

import icon_3 from "@/public/Images/3.png";

import icon_4 from "@/public/Images/4.png";

import icon_5 from "@/public/Images/5.png";

import icon_6 from "@/public/Images/6.png";

import icon_7 from "@/public/Images/7.png";

import icon_8 from "@/public/Images/8.png";
import Link from "next/link";
export default function SliderHome() {
  const imgWidth = item_1.width;
  const imgHeight = item_1.height;

  const menu_icon = [
    {
      link: "/",
      url: icon_1,
      title: "Sale giữa tháng",
    },
    {
      link: "/",
      url: icon_2,
      title: "Giao 2H",
    },
    {
      link: "/",
      url: icon_3,
      title: "Nước hoa chính hãng",
    },
    {
      link: "/",
      url: icon_4,
      title: "Clinic & S.P.A",
    },
    {
      link: "/",
      url: icon_5,
      title: "Clinic Deals",
    },
    {
      link: "/",
      url: icon_6,
      title: "Gia dụng & Đời sống",
    },
    {
      link: "/",
      url: icon_7,
      title: "Đặt hẹn",
    },
    {
      link: "/",
      url: icon_8,
      title: "Cẩm nang",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex flex-col md:flex-row gap-3 items-stretch">
        {/* ── SLIDER ── */}
        <div className="w-full md:w-[70%] rounded-xl overflow-hidden">
          <Swiper
            speed={600}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Image
                src={item_1}
                alt="Banner 1"
                width={imgWidth}
                height={imgHeight}
                className="w-full h-auto block"
                priority
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={item_2}
                alt="Banner 2"
                width={imgWidth}
                height={imgHeight}
                className="w-full h-auto block"
                priority
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={item_3}
                alt="Banner 3"
                width={imgWidth}
                height={imgHeight}
                className="w-full h-auto block"
                priority
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* ── PANEL PHẢI ── */}
        <div className="w-full md:w-[30%] grid grid-cols-2 md:grid-cols-1 gap-3">
          {/* Panel 1: Giao hàng */}
          <div className="bg-[#F7E8E4] border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 rounded-full p-1.5">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight">
                    Giao nhanh miễn phí · 2H
                  </p>
                  <p className="text-[10px] text-gray-400">NowFree 2H</p>
                </div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors">
                Nhận ngay voucher 100k
              </button>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                <p className="text-[11px] font-semibold leading-tight">
                  Tại TP.HCM & Lâm Đồng
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Từ 90K kể cả Chủ Nhật (9H &gt; 18H)
                </p>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-[12px] font-bold text-green-700">FREESHIP</p>
                <p className="text-[10px] text-gray-500">
                  Toàn quốc đơn từ 249K
                </p>
              </div>
            </div>
          </div>

          {/* Panel 2: QR + Tải app */}
          <div className="bg-[#F7E8E4] border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-start gap-2 mb-4">
              <svg
                className="w-5 h-5 text-gray-500 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
              <p className="text-[11px] text-gray-600 leading-snug">
                Quét mã vạch kiểm tra giá
                <br />& thông tin sản phẩm nhanh
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 text-green-800 text-[12px] font-semibold px-4 py-2 rounded-full transition-colors">
                Tải App Sora Beauty
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center bg-white">
                <QrCode />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m-5">
        <div className="grid grid-cols-3 md:grid-cols-8 items-center">
          {menu_icon.map((item: any, index: number) => {
            return (
              <div
                className="flex flex-col items-center cursor-pointer"
                key={item + index}
              >
                <Image className="m-auto" src={item.url} alt="Lỗi icon" />
                <Link href={item.link}>
                  <span className="text-[12px] md:text-[14px] capitalize">
                    {item.title}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./categories.css";
interface Props {
  categories: any;
}

export default function Swiper_categories({ categories }: Props) {
  const items = categories?.data?.data ?? [];

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-400 py-6">
        Không có danh mục để hiển thị
      </div>
    );
  }

  const BORDER_COLORS = [
    "border-pink-300",
    "border-red-300",
    "border-orange-300",
    "border-yellow-300",
    "border-lime-300",
    "border-emerald-300",
    "border-cyan-300",
    "border-blue-300",
    "border-violet-300",
    "border-fuchsia-300",
  ];

  const getRandomBorder = (index: number) => {
    return BORDER_COLORS[index % BORDER_COLORS.length];
  };
  return (
    <div className="w-full">
      <Swiper
        navigation
        observer={true}
        observeParents={true}
        resizeObserver={true}
        spaceBetween={16}
        slidesPerView={2}
        slidesPerGroup={2}
        speed={600}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={items.length > 9}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          640: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          1024: {
            slidesPerView: 7,
            slidesPerGroup: 7,
          },
          1280: {
            slidesPerView: 9,
            slidesPerGroup: 9,
          },
        }}
        className="w-full mySwiper"
      >
        {items.map((category: any, index: number) => (
          <SwiperSlide key={category.id ?? category.name}>
            <div
              className={`flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border-2 ${getRandomBorder(index)} p-3 hover:shadow-md hover:-translate-y-0.1 transition-all cursor-pointer`}
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  className="max-w-full max-h-full object-contain"
                  src={category.url_image || "/placeholder-category.png"}
                  alt={category.name}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-category.png";
                  }}
                />
              </div>
              <span className="mt-2 text-sm text-gray-700 text-center truncate w-full">
                {category.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

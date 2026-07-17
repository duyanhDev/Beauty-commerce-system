"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { formatVND } from "@/utils/currency";
import Link from "next/link";

interface ProductSwiperProps {
  products: any;
}

export default async function ProductSwiper({ products }: ProductSwiperProps) {
  return (
    <Swiper
      navigation
      spaceBetween={20}
      slidesPerView={5}
      slidesPerGroup={5}
      speed={600}
      autoplay={{
        delay: 2000, // 3 giây chuyển slide
        disableOnInteraction: false, // Vuốt vẫn tiếp tục autoplay
        pauseOnMouseEnter: true, // Di chuột vào thì dừng
      }}
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      breakpoints={{
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        640: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1024: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
      }}
    >
      {products?.data.map((item: any) => (
        <SwiperSlide key={item.id}>
          <div className="bg-white rounded-xl p-3  mt-4 h-auto cursor-pointer">
            <Link href={`/san-pham/${item.slug}`}>
              <img
                src={item.images[0].isMain === true && item.images[0].imageUrl}
                alt={item.name}
                className="h w-full h-80 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />

              <h3 className="mt-3 font-semibold line-clamp-2">{item.name}</h3>

              <div className="flex gap-2.5">
                <span className="text-orange-400 font-bold text-sm">
                  {formatVND(item.variants[0].priceAfterDiscount)}
                </span>
                <span className="font-medium text-xs line-through text-muted-foreground">
                  {formatVND(item.variants[0].originalPrice)}
                </span>
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

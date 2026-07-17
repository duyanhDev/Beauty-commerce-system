import ProductSwiper from "@/components/ProductSwiper/ProductSwiper";
import SliderHome from "@/components/Swiper/Slider";
import { ProductsAPI } from "@/services/products/products";
import banner_desktop from "@/public/Images/banner-desk-top.jpg";
import banner_1 from "@/public/Images/1780988912loreal-cpd-sub-banner-home-desktop-427x140-13032026_img.jpg";
import banner_2 from "@/public/Images/sub-banner-home-desktop-427x140-13032026_img_427x140_2ee5fc_fit_center.jpg";
import Image from "next/image";
import Link from "next/link";
import { CategoriesAPI } from "@/services/categories/catogories";
import Swiper_categories from "@/components/Swiper_categories/Swiper_categories";
import brand from "@/public/Images/brand.jpg";
import brand_1 from "@/public/Images/barnd_1.jpg";
import brand_2 from "@/public/Images/brand_6.jpg";
import brand_3 from "@/public/Images/brand_3.jpg";
import brand_4 from "@/public/Images/brand_4.jpg";
import brand_5 from "@/public/Images/brand_5.jpg";
import brand_6 from "@/public/Images/brand_6.jpg";
import brand_7 from "@/public/Images/brand_7.jpg";
import brand_8 from "@/public/Images/brand_8.jpg";
export default async function HomePage() {
  const products: any = await ProductsAPI.loadDataProducts({
    page: 1,
    limit: 10,
    keyword: "",
    sortBy: "created_at",
    order: "DESC",
  });

  const categories = await CategoriesAPI.getCatogries();

  const images = [
    {
      href: "/",
      url: banner_1,
      title: "Ảnh banner simple",
    },
    {
      href: "/",
      url: banner_desktop,
      title: "Ảnh banner simple",
    },
    {
      href: "/",
      url: banner_2,
      title: "Ảnh banner simple",
    },
    {
      href: "/",
      url: banner_desktop,
      title: "Ảnh banner simple",
    },
  ];

  const brand_images = [
    {
      href: "/",
      url: brand_1,
    },
    {
      href: "/",
      url: brand_2,
    },
    {
      href: "/",
      url: brand_3,
    },
    {
      href: "/",
      url: brand_4,
    },
    {
      href: "/",
      url: brand_5,
    },
    {
      href: "/",
      url: brand_6,
    },
    {
      href: "/",
      url: brand_7,
    },
    {
      href: "/",
      url: brand_8,
    },
  ];

  return (
    <div className="container m-auto">
      <SliderHome />

      <div className="bg-[#FF8E4D] rounded-[20px] shadow-base mx-7">
        <div className=" container p-4 ">
          <ProductSwiper products={products} />
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 p-5">
        {images &&
          images.map((img, index) => {
            return (
              <Link href={img.href} key={`${img.title} - ${index}`}>
                <Image src={img.url} alt={img.title} className="rounded-2xl" />
              </Link>
            );
          })}
      </div>

      <div className="mx-5 mt-5 bg-white  rounded-2xl shadow-sm p-4 md:p-6">
        <p className="text-lg font-bold mb-3 text-emerald-700">Danh mục</p>

        <div>
          <Swiper_categories categories={categories} />
        </div>
      </div>

      <div className="mx-5 mt-5 bg-white rounded-2xl shadow-sm p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-emerald-700">
            Thương hiệu
          </h2>
          <Link
            href="/thuong-hieu"
            className="text-sm text-gray-500 hover:text-emerald-600"
          >
            Xem tất cả
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-wrap md:flex-nowrap gap-3">
          <div className="relative w-full md:w-[32%] rounded-xl overflow-hidden">
            <Image
              src={brand}
              alt="Ảnh thương hiệu"
              fill
              sizes="(max-width: 768px) 100vw, 32vw"
              className="object-cover"
            />
          </div>

          <div className="w-full md:w-[68%] grid grid-cols-2 md:grid-cols-4 gap-3">
            {brand_images?.map((b, index) => (
              <Link
                href={b.href}
                key={index + b.href}
                className="relative w-full aspect-square rounded-xl overflow-hidden"
              >
                <Image
                  src={b.url}
                  alt="Ảnh thương hiệu"
                  fill
                  sizes="(max-width: 768px) 50vw, 17vw"
                  className="object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

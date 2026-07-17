import { ProductResponse } from "@/types/ProductsType";
import { QueryDTO } from "@/types/QueryDTO";

export const ProductsAPI = {
  loadDataProducts: async ({
    page = 1,
    limit = 10,
    keyword = "",
    sortBy = "created_at",
    order = "DESC",
  }: QueryDTO): Promise<ProductResponse> => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      keyword,
      sortBy,
      order,
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${params}`,

      {
        next: {
          revalidate: 60,
        },
      },
    );

    if (!res.ok) {
      const errorText = await res.text();

      console.error(
        "API URL:",
        `${process.env.NEXT_PUBLIC_API_URL}/products?${params}`,
      );
      console.error("Status:", res.status);
      console.error("Response:", errorText);

      throw new Error(`Không thể tải danh sách sản phẩm - ${res.status}`);
    }

    return res.json();
  },

  getDataProductBySlug: async (slug: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
      );

      if (!res.ok) {
        throw new Error(`Không thể tải danh sách sản phẩm - ${res.status}`);
      }

      return res.json();
    } catch (error) {}
  },
};

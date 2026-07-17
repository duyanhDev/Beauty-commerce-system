export const CategoriesAPI = {
  getCatogries: async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Status:", res.status);
      console.error("Response:", errorText);

      throw new Error(`Không thể tải danh sách sản phẩm - ${res.status}`);
    }

    return res.json();
  },
};

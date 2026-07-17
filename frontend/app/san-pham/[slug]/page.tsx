import { ProductsAPI } from "@/services/products/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log(slug);

  const data = await ProductsAPI.getDataProductBySlug(slug);

  console.log(data);

  return <h1>{data.data.name}</h1>;
}

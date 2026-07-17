export interface ProductResponse {
  data: Product[];
  meta: Meta;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  images: ProductImage[];
  variants: Variant[];
  brand: Brand;
  brandId: number;
  productCode: string;
  verifyToken: string;
  created_at: string;
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  publicId: string;
  isMain: boolean;
  created_at: string;
}

export interface Variant {
  id: number;
  sku: string;
  barcode: string | null;
  isActive: boolean;
  costPrice: number;
  originalPrice: number;
  discountPercent: number;
  salePrice: number;
  saleStartAt: string | null;
  saleEndAt: string | null;
  stock: number;
  reserved: number;
  sold: number;
  lowStockThreshold: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  imageThumbnail: string;
  note: string | null;
  images: VariantImage[];
  createdAt: string;
  updatedAt: string;
}

export interface VariantImage {
  id: number;
  imageUrl: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface PaginationResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
}

export type ProductListResponse = PaginationResponse<Product>;

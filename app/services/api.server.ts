// Type definitions for DummyJSON API
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProduct(productId: string): Promise<Product> {
  try {
    fetch("https://dummyjson.com/test")
      .then((res) => res.json())
      .then(console.log);

    const response = await fetch(`https://dummyjson.com/products/${productId}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product: ${response.status} ${response.statusText}`
      );
    }

    const product: Product = await response.json();
    return product;
  } catch (err) {
    console.error("Error fetching product:", err);
    throw err;
  }
}

export async function getAllProducts(): Promise<ProductsResponse> {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    const data: ProductsResponse = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}

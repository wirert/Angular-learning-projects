export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  color: string[];
  gender: string;
  size: number[];
  price: number;
  discountPrice?: number;
  is_in_inventory: boolean;
  items_left: number;
  imageURL: string;
  slug: string;
  description: string;
}

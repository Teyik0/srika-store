export interface Category {
  name: string;
  slug: string;
}

export interface Vendor {
  name: string;
  slug: string;
  logoUrl: string;
}

export interface Presentation {
  fr: string;
  en: string;
}

export interface Content {
  fr: string;
  en: string;
}

export interface Product {
  imageUrl: string;
  title: string;
  price: number;
  presentation: Presentation;
  content: Content;
  slug: string;
  vendor: Vendor;
  categories: Category[];
  quantity: number | null;
}

export interface Color {
  name: string;
  hex: string;
}

export interface Size {
  name: string;
  abbreviation: string;
}

export interface Variant {
  color: Color;
  size: Size;
  sku: string;
  images?: string[];
  inventory: number;
}

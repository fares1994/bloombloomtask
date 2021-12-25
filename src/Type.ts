export interface Colors {
  primary: string;
  secondary: string;
  blue: string;
  silver: string;
}

export interface Collection {
  id: number;
  name: string;
  configuration_name: string;
}

export type LensType =
  | "black"
  | "tortoise"
  | "coloured"
  | "crystal"
  | "dark"
  | "bright";

export type FrameType = "square" | "rectangle" | "round" | "cat-eye";

export interface CostInterface {
  id: number;
  materials: number;
  labour: number;
  transport: number;
  taxes: number;
}
export interface FrameVariant {
  id: number;
  name: string;
  configuration_name: string;
}

export interface Media {
  file_location: string;
  file_name: string;
  id: number;
  medium_type: string;
  mime_type: string;
  position: number;
  url: string;
}
export interface Variant {
  id: number;
  inventory: number;
  media: Media[];
  price: number;
  frame_variants: FrameVariant[];
}
export interface GLassItem {
  configuration_name: string;
  cost_breakdown: CostInterface;
  glass_variants: Variant[];
  length: 4;
  id: number;
  name: string;
}

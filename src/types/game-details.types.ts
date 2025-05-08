export interface GameDetails {
  id: number;
  name: string;
  slug: string;
  description: string;
  rating: number;
  background_image: string;
  background_image_additional: string;
  website: string;
  platforms: { platform: { name: string } }[];
  released: string;
  developers: { name: string }[];
  genres: { name: string }[];
  screenshots?: { image: string }[];
}

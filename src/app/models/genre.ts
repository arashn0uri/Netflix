import { Film } from './film';

export interface Genre {
  id?: number;
  name: string;
  image_url: string;
  created_by?: string;
  created_at?: string;
  films?: Film;
  selected?: boolean;
}

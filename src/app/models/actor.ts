import { Film } from './film';

export interface Actor {
  id: number;
  firstname: string;
  lastname: string;
  photo_url?: string;
  selected?: boolean;
  birthdate: string;
  created_by?: number;
  created_at?: number;
  films?: Film;
}

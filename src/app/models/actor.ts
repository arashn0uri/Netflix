import { Film } from './film';

export interface Actor {
  id: number;
  firstname: string;
  lastname: string;
  photo_url?: string;
  selected?: boolean;
  fullname?: string;
  birthdate: string;
  created_by?: number;
  created_at?: number;
  films?: Film;
  modify?: boolean;
}

import { Time } from '@angular/common';
export interface Film {
  id: number;
  title: string;
  description: string;
  plot: string;
  director: string;
  duration: string;
  release_year: number;
  cover_url: string;
  tags: string;
  created_by: number;
  created_at?: Date;
  stars: number;
  actors: any[];
  genres: any[];
  vote: number;
}

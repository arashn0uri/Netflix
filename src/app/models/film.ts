import { Time } from '@angular/common';
export interface Film {
  id: number;
  title: string;
  description: string;
  plot: string;
  director: string;
  duration: Time;
  release_year: number;
  cover_url: string;
  tags: string;
  created_by: number;
  stars: number;
  actors: any[];
  genres: any[];
  vote: number;
}
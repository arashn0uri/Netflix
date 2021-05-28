export interface User {
  id?: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  photo_url: string;
  favorite_films: number[];
  favorite_actors: number[];
  favorite_genre: number[];
  token: string;
  last_login: Date;
}

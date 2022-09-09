export interface BookType {
  id: number;
  name: string;
  price: number;
  sale: boolean;
  description: string;
  cover: string;
  authors: AuthorType[],
  ratings: number[];
  genres: GenreType[]
}

export interface AuthorType {
  id: number;
  name: string;
}

export interface GenreType {
  id: number;
  name: string;
}

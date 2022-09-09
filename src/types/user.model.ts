import type { BookType } from "./book.model";

export interface UserType {
  id: number;
  email: string;
  firstName?:string;
  lastName?: string;
  avatarPath?: string;
  favorites: BookType[]
}
import { User } from './user';
export class Comment {
  _id: string;
  parent?: Comment;
  author?: User;
  text?: string;
  slug?: string;
  likeCount?: number;
  score?: number;
  createDate?: string;
  editDate?: string;
}

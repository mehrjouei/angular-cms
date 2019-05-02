import { Category } from './category';
import { Comment } from './comment';
import { User } from './user';
export class Article {
  _id?: string;
  title?: string;
  slug?: string;
  summary?: string;
  content?: string;
  categories?: Category[];
  comments?: Comment[];
  author?: User;
  createDate?: string;
  editDate?: string;
  image?: string;
  tags?: string;
  isDraft?: boolean;
  visitCount?: number;
  likeCount?: number;
  score?: number;
}

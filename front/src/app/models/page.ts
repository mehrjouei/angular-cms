import { Template } from './template';
import { Role } from './role';
import { User } from './user';
import { Part } from './part';

export class Page {
  _id?: string;
  title?: string;
  slug?: string;
  template?: Template;
  roles?: Role[];
  tags?: string;
  assets?: string;
  isInMenu?: boolean;
  createDate?: Date;
  editDate?: Date;
  author?: User;
  parts?: Part[];
}

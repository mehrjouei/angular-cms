import { Resource } from './resource';

export class Role { //TODO models defined here for now
  _id?: string;
  name?: string;
  status?: string;
  description?: string;
  resources?: Resource[];
}

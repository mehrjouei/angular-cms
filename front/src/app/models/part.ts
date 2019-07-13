import { Module } from './module';
import { Container } from './container';
import { Role } from './role';

export class Part {
  _id?: string;
  module?: Module;
  container?: Container;
  pane?: string;
  data?: object;
  title?: string;
  roles?:any[];
}

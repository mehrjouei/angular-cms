import { Module } from './module';
import { Container } from './container';

export class Part {
  _id?: string;
  module?: Module;
  container?: Container;
  pane?: string;
  data?: object;
  title?: string;
}

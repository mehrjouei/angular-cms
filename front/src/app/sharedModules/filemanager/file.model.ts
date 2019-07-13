export class FileModel {
  name?: string;
  path?: string;
  extension?: string;
  size?: string; // bytes
  isDirectory?: boolean;
  date:string;
  children?: FileModel[]
}
export class File {
    name?: string;
    path?: string;
    extension?: string;
    size?: string; // bytes
    date?: Date;
    isDirectory?: boolean;
    // parent?: File;
    buffer?: Buffer;
    children?: File[]
}
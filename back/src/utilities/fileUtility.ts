import * as fs from "fs";
import * as path from "path";
import to from "await-to-js";
import { File } from '../viewModels/file';
import Copy from '../viewModels/copy';
import * as config from '../config';
import * as filesize from 'filesize';
const getFolderSize = require('get-folder-size');


export async function exists(_path: string): Promise<boolean | object> {
    return new Promise((resolve, reject) => {
        fs.open(_path, 'r', (error, file) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    return resolve(false);
                }
                return reject(error);
            }
            return resolve(true);
        });
    });
}


export async function isDirectory(_path: string): Promise<boolean | object> {
    return new Promise(async (resolve, reject) => {
        const [e, r] = await (to(exists(_path)));
        if (e) {
            if ((e as any).code === 'ENOTDIR') {
                return resolve(false);
            }
            return reject(e);
        }
        if (!r) {
            return reject('file doesn\'t exist.');
        }
        fs.stat(_path, (error, stats) => {
            if (error) {
                return reject(error);
            } else {
                const isDirectory = stats.isDirectory() ? true : false;
                return resolve(isDirectory);
            }
        });
    });
}

export async function getDirectory(_path: string): Promise<File> {
    return new Promise(async (resolve, reject) => {
        const [e, r] = await (to(exists(_path)));
        if (e) {
            return reject(e);
        }
        if (!r) {
            return reject('file doesn\'t exist.');
        }
        fs.readdir(_path, async (error, files) => {
            if (error) {
                return reject(error);
            }
            const [e, r] = await to(Promise.all(files.map(async (file) => { //TODO yekam kirie
                const [_e, _r] = await to(isDirectory(_path + file));
                if (_e) {
                    return reject(_e); // TODO balayi reject nemishe!
                }
                const [__e, __r] = await to(getFile(_path + file));
                if (__e || __r === undefined) {
                    return reject(_e); // TODO balayi reject nemishe!
                }
                return {
                    name: __r.name,
                    path: path.basename(__r.path as string) + '/',
                    extension: !_r ? path.extname(_path + file) : undefined,
                    size: __r.size,
                    date: __r.date,
                    isDirectory: _r
                } as File;
            })));
            if (e) {
                return reject(e);
            }
            if (!r) {
                return reject('error in reading contents of directory');
            } else {
                const file: File = {};
                file.name = path.basename(_path);
                file.path = path.basename(path.dirname(_path)).replace('public', ''); //TODO
                file.isDirectory = true;
                file.children = r as File[]; // TODO tryCast
                // const [___e, ___r] = await to(getDirectorySize(_path));
                // if (___e) {
                //     return reject(___e);
                // }
                const [___e, ___r] = await to(getFile(_path));
                if (___e || ___r === undefined) {
                    return reject(___e);
                }
                file.size = ___r.size;
                file.date = ___r.date;
                return resolve(file);
            }
        });
    });
}

export async function getDirectorySize(_path: string): Promise<string | any> {
    return new Promise((resolve, reject) => {
        getFolderSize(_path, (error: any, size: any) => { // TODO what's wrong with fs.stat!?
            if (error) {
                return reject(error);
            } else {
                return resolve(filesize(size));
            }
        });
    });
}

export async function getFile(_path: string): Promise<File> {
    return new Promise(async (resolve, reject) => {
        const [e, r] = await (to(exists(_path)));
        if (e) {
            return reject(e);
        }
        if (!r) {
            return reject('file doesn\'t exist.');
        }
        fs.stat(_path, async (error, stats) => {
            if (error) {
                return reject(error);
            }
            const file: File = {};
            file.name = path.basename(_path);
            file.path = path.dirname(_path);
            file.extension = path.extname(_path);
            file.size = filesize(stats.size);
            file.date = stats.mtime;
            file.isDirectory = false;
            return resolve(file);
        });
    });
}

export function getWebsiteCdnFolder(fileName: string, type: string, websiteName: string): string {
    if (type === 'file') {
        return config.variables.cdn + '/' + websiteName + decodeURIComponent(fileName);
    }
    if (type === 'directory') {
        if (fileName !== '/' && fileName.lastIndexOf('/') !== fileName.length - 1) {
            fileName += '/';
        }
        return config.variables.cdn + '/' + websiteName + decodeURIComponent(fileName); // sample: /  ,  /Pictures
    }
    return '';
}

export function decodeBase64String(encodedBase64String: string): Buffer {
    return Buffer.from(encodedBase64String, 'base64');
}

async function saveFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        if (!file.path) {
            return reject('no file path provided.');
        }
        if (!file.buffer) {
            return reject('no file provided.')
        }
        fs.open(file.path, 'w', (err, fd) => {
            if (err) {
                return reject(err);
            }
            fs.write(fd, file.buffer as Buffer, 0, (file.buffer as Buffer).length, null, function (_err) {
                if (_err) {
                    return reject(_err);
                }
                fs.close(fd, (__err) => {
                    if (__err) {
                        return reject(__err);
                    }
                    return resolve('file has been saved.');
                });
            });
        });
    });
}

export async function saveFiles(files: File[]): Promise<any> {
    return new Promise(async (resolve, reject) => {
        const [e, r] = await to(Promise.all(files.map(f => saveFile(f))));
        if (e) { // TODO we should handle how many files has been saved and how many has not been saved (rejected)
            return reject(e);
        }
        return resolve('file(s) has been saved.')
    });
}

async function copyFile(copy: Copy) {
    return new Promise(async (resolve, reject) => {
        if (!copy.source) {
            return reject('source not provided');
        }
        if (!copy.destination) {
            return reject('destination not provided');
        }
        const [e, r] = await (to(exists(copy.source)));
        if (e) {
            return reject(e);
        }
        if (!r) {
            return reject('source doesn\'t exist.');
        }
        const [_e, _r] = await (to(exists(copy.destination)));
        if (_e) {
            return reject(_e);
        }
        if (_r) {
            return reject('destination already exists.');
        }
        if (!copy.isMove) {
            fs.copyFile(copy.source, copy.destination, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve('file has been copied: ' + copy.source);
            });
        } else {
            fs.rename(copy.source, copy.destination, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve('file has been moved: ' + copy.source);
            });
        }
    });
}

// file only
export async function copyFiles(copies: Copy[]) {
    return new Promise(async (resolve, reject) => {
        const [e, r] = await to(Promise.all(copies.map(async (c) => {
            return new Promise(async (_resolve, _reject) => {
                const [_e, _r] = await to(copyFile(c));
                if (_e) {
                    return _resolve({
                        state: 'rejected',
                        value: _e
                    });
                }
                return _resolve({
                    state: 'fulfilled',
                    value: _r
                });
            });
        })));
        if (e) {
            return reject(e); // should never happern, need fatal log
        }
        return resolve(r);
    });
}

async function deleteFile(file: string) {
    return new Promise(async (resolve, reject) => {
        if (!file) {
            return reject('no file provided');
        }
        const [e, r] = await (to(exists(file)));
        if (e) {
            return reject(e);
        }
        if (!r) {
            return reject('file doesn\'t exist.');
        }
        fs.unlink(file, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve('file has been deleted: ' + file);
        });
    });
}

export async function deleteFiles(files: string[]) {
    return new Promise(async (resolve, reject) => {
        const [e, r] = await to(Promise.all(files.map(async (f) => {
            return new Promise(async (_resolve, _reject) => {
                const [_e, _r] = await to(deleteFile(f));
                if (_e) {
                    return _resolve({
                        state: 'rejected',
                        value: _e
                    });
                }
                return _resolve({
                    state: 'fulfilled',
                    value: _r
                });
            });
        })));
        if (e) {
            return reject(e); // should never happern, need fatal log
        }
        return resolve(r);
    });
}

export async function createDirectory(path: string) {
    return new Promise(async (resolve, reject) => {
        fs.mkdir(path, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve('directory has been created: ' + path);
        });
    });
}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileModel } from './file.model';
import Copy from './copy.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilemanagerService {
  currentDirectory: {
    path: BehaviorSubject<string>,
    file: BehaviorSubject<FileModel>,
    selections: BehaviorSubject<any[]>,
    layout: BehaviorSubject<string>,
    mouse: BehaviorSubject<any>,
    isCopy: boolean,
    isMove: boolean
  };
  constructor(
    private http: HttpClient
  ) {
    this.currentDirectory = {
      path: new BehaviorSubject<string>(""),
      file: new BehaviorSubject<FileModel>(null),
      selections: new BehaviorSubject<any[]>([]),
      layout: new BehaviorSubject<string>("large"),
      mouse: new BehaviorSubject<any>(null),
      isCopy: true,
      isMove: true
    };

    this.currentDirectory.path.subscribe(x => {
      if (x) {
        this.getFilesAndDirectories(x);
      }
    });
  }
  getFilesAndDirectories(path) {
    this.http.get<FileModel>(environment.baseUrl + `/file/getDirectory?path=${encodeURIComponent(path)}`)
      .toPromise()
      .then((x: FileModel) => {
        x.children.sort(((b, c) => (b.isDirectory < c.isDirectory) ? 1 : (b.isDirectory == c.isDirectory) ? 0 : -1));
        this.currentDirectory.file.next(x);
      });
  }

  changePath(path) {
    return this.currentDirectory.path.next(path);
  }

  copy(copies: Copy[]) {
    return this.http.post(environment.baseUrl + `/file/copy`, copies);
  }

  rename(renames: Copy[]) {
    return this.http.post(environment.baseUrl + `/file/rename`, renames);
  }

  delete(files: string[]) {
    return this.http.post(environment.baseUrl + `/file/delete`, files);
  }

  createDirectory(path: string) {
    return this.http.post(environment.baseUrl + `/file/create-directory`, { path });
  }

  upload(files: [{ name: string, file: string }]) {
    return this.http.post(environment.baseUrl + `/file/upload`, files);
  }

  download(path: string) {
    return this.http.get(environment.baseUrl + `/file/download`,
      { responseType: 'blob', params: { path } });
  }

  // rename(oldName: string, newName: string) {
  //   return this.http.post(environment.baseUrl + `/file/download`, { oldName, newName });
  // }

  getBase64(file, ) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
}

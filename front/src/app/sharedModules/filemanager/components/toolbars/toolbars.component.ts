import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilemanagerService } from '../../filemanager.service';
import Copy from '../../copy.model';
import { DialogService } from '../../../dialog/dialog.service';
import { NewNameDialogComponent } from '../new-name-dialog/new-name-dialog.component';

@Component({
  selector: 'filemanager-toolbars',
  templateUrl: './toolbars.component.html',
  styleUrls: ['./toolbars.component.scss']
})
export class ToolbarsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  private copies = [];

  constructor(private fileManagerService: FilemanagerService, public dialog: DialogService) { }

  ngOnInit() {

  }

  onCopy(isMove: boolean) {
    if (this.fileManagerService.currentDirectory.selections.getValue()) {
      if (!isMove) {
        this.fileManagerService.currentDirectory.isCopy = true;
        this.fileManagerService.currentDirectory.isMove = false;
      } else {
        this.fileManagerService.currentDirectory.isMove = true;
        this.fileManagerService.currentDirectory.isCopy = false;
      }
      this.copies = Object.assign([], this.fileManagerService.currentDirectory.selections.getValue());
    }
  }

  onPaste() {
    if (!this.copies || !this.copies.length) {
      return;
    }
    if (this.fileManagerService.currentDirectory.isCopy) {
      this.paste(false);
    } else if (this.fileManagerService.currentDirectory.isMove) {
      this.paste(true);
    }
  }

  isPasteEnabled() {
    return this.fileManagerService.currentDirectory.isCopy || this.fileManagerService.currentDirectory.isMove;
  }

  private paste(isMove: boolean) {
    const newLocation = this.fileManagerService.currentDirectory.path.getValue();
    const selections = this.copies;
    const copies = selections.map(s => ({
      source: s,
      destination: newLocation,
      isMove
    })) as Copy[];
    this.fileManagerService.copy(copies).subscribe((r) => {
      this.fileManagerService.changePath(newLocation);
    });
  }

  onUpload() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const filePromises = [];
      for (let i = 0; i < event.target.files.length; i++) {
        filePromises.push(this.fileManagerService.getBase64(event.target.files[i]));
      }
      Promise.all(filePromises)
        .then((resolves: any[]) => {
          const files = [];
          for (let i = 0; i < event.target.files.length; i++) {
            files.push({
              name: event.target.files[0].name,
              path: this.fileManagerService.currentDirectory.path.getValue(),
              file: resolves[i]
            });
          }
          this.fileManagerService.upload(files as [{ name: string, file: string }]).subscribe((r) => {
            this.fileManagerService.changePath(this.fileManagerService.currentDirectory.path.getValue());
          });
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }

  onDownload() {
  }

  onDelete() {
    if (!this.fileManagerService.currentDirectory.selections.getValue() ||
      !this.fileManagerService.currentDirectory.selections.getValue().length) {
      return;
    }
    const files = this.fileManagerService.currentDirectory.selections.getValue() as string[];
    this.fileManagerService.delete(files).subscribe((r) => {
      this.fileManagerService.changePath(this.fileManagerService.currentDirectory.path.getValue());
    });
  }

  onRename() {
    if (!this.fileManagerService.currentDirectory.selections.getValue() ||
      this.fileManagerService.currentDirectory.selections.getValue().length !== 1) {
      return;
    }
    this.dialog.open(NewNameDialogComponent, {
      data: {
        header: 'Please write new file name:',
      }
    }).afterClosed.subscribe((name => {
      this.fileManagerService.rename([{
        source: this.fileManagerService.currentDirectory.selections.getValue()[0],
        destination: this.fileManagerService.currentDirectory.path.getValue() + name,
        isMove: true
      }]).subscribe((r) => {
        this.fileManagerService.changePath(this.fileManagerService.currentDirectory.path.getValue());
      });
    }));
  }

  onNewFolder() {
    this.dialog.open(NewNameDialogComponent, {
      data: {
        header: 'Please write new folder name:',
      }
    }).afterClosed.subscribe((name => {
      this.fileManagerService.createDirectory(this.fileManagerService.currentDirectory.path.getValue() + name).subscribe((r) => {
        this.fileManagerService.changePath(this.fileManagerService.currentDirectory.path.getValue());
      });
    }));
  }

  onLargeIcons() {
    this.fileManagerService.currentDirectory.layout.next('large');
  }

  onMediumIcons() {
    this.fileManagerService.currentDirectory.layout.next('medium');
  }

  onDetailsIcon() {
    this.fileManagerService.currentDirectory.layout.next('details');
  }

}

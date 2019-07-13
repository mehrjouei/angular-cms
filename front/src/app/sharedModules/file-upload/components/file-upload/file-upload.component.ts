import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
  onChange: Function;
  public file: File | null = null; // TODO public e

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>) {
  }

  ngOnInit() {
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

}

export function requiredFileTypeValidator(type: string): ValidatorFn { // TODO jaash khube!
  debugger;
  return (control: FormControl) => {
    debugger;
    const file = control.value;
    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      if (type.toLowerCase() !== extension.toLowerCase()) {
        return {
          requiredFileType: true
        };
      }
      return null;
    }
    return null;
  };
}

export function toFormData<T>(formValue: T) {
  const formData = new FormData();

  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}

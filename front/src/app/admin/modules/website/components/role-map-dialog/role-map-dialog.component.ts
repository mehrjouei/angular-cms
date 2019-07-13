import { Component, OnInit } from '@angular/core';
import { DialogRef } from '../../../../../sharedModules/dialog/dialog-ref';
import { DialogConfig } from '../../../../../sharedModules/dialog/dialog-config';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { WebsiteService } from '../../../../../services/website.service';

@Component({
  selector: 'role-map-dialog',
  templateUrl: './role-map-dialog.component.html',
  styleUrls: ['./role-map-dialog.component.scss']
})
export class RoleMapDialogComponent implements OnInit {
  data;

  mapsForm = this.fb.group({
    maps: this.fb.array([
      this.createMap()
    ])
  });

  get maps() {
    return this.mapsForm.get('maps') as FormArray;
  }

  createMap() {
    return this.fb.group({
      name: this.fb.control('', Validators.required),
      pairName: this.fb.control('', Validators.required)
    });
  }

  createMap2(map) {
    return this.fb.group({
      name: this.fb.control(map.name, Validators.required),
      pairName: this.fb.control(map.pair, Validators.required)
    });
  }

  constructor(
    protected dialog: DialogRef,
    protected config: DialogConfig,
    protected fb: FormBuilder,
    protected websiteService: WebsiteService
  ) {
    this.data = this.config.data;
  }

  ngOnInit() {
    this.websiteService.listRoleMappings().subscribe((res: any) => {
      if (res.data && res.data.length) {
        this.maps.removeAt(0);
      }
      res.data.forEach(map => {
        this.maps.push(this.createMap2(map));
      })
    });
  }

  addMap() {
    this.maps.push(
      this.createMap()
    );
  }

  removeMap(i) {
    this.maps.removeAt(i);
  }

  onSubmit() {
    this.websiteService.updateRoleMappings(this.mapsForm.value.maps).subscribe((_: any) => {
      alert('saved');
      this.dialog.close(
        true
      ); // TODO what is the bloody difference
    });
  }
}

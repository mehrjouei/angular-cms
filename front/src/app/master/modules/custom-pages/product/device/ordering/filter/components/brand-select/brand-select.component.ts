import { Component, OnInit } from '@angular/core';
import { DialogRef } from 'src/app/sharedModules/dialog/dialog-ref';
import { DialogConfig } from 'src/app/sharedModules/dialog/dialog-config';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-brand-select',
  templateUrl: './brand-select.component.html',
  styleUrls: ['./brand-select.component.scss'],
})
export class BrandSelectComponent implements OnInit {
  deviceKindId;
  brandList = [];
  brandFilteredList = [];
  constructor(
    private dialog: DialogRef,
    public config: DialogConfig,
    private deviceSerivce:DeviceService
  ) {
    this.deviceKindId = this.config.data.data.deviceKindId;
    console.log(this.deviceKindId);
  }

  ngOnInit() {
    this.deviceSerivce.getBrands(this.deviceKindId).then(brandList => {
        this.brandList = brandList;
        this.brandFilteredList = brandList;
    })
  }
  selectBrand(brand) {
    this.dialog.close(
      { brandTitle: brand.name, brandId: brand.brandID }
    );
  }
  brandFilter(filterText) {
    this.brandFilteredList = this.brandList.filter(brand => brand.name.toLowerCase().includes(filterText.toLowerCase()));
  }

}

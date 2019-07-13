import { Component, OnInit } from '@angular/core';
import { DialogRef } from 'src/app/sharedModules/dialog/dialog-ref';
import { DialogConfig } from 'src/app/sharedModules/dialog/dialog-config';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-model-select',
  templateUrl: './model-select.component.html',
  styleUrls: ['./model-select.component.scss'],
})
export class ModelSelectComponent implements OnInit {
  brandId;
  modelList = [];
  deviceKindId;
  modelFilteredList = [];
  constructor(
    private dialog: DialogRef,
    public config: DialogConfig,
    private deviceSerivce:DeviceService
  ) {
    this.brandId = this.config.data.data.brandId;
    this.deviceKindId = this.config.data.data.deviceKindId;
    console.log(this.brandId);
  }

  ngOnInit() {
    this.deviceSerivce.getModels(this.brandId).then(modelList => {
        this.modelList = modelList;
        this.modelFilteredList = modelList;
    })
  }
  selectModel(model) {
    this.dialog.close(
      { modelTitle: model.name, modelId: model.modelID }
    );
  }
  modelFilter(filterText) {
    this.modelFilteredList = this.modelList.filter(model => model.name.toLowerCase().includes(filterText.toLowerCase()));
  }

}

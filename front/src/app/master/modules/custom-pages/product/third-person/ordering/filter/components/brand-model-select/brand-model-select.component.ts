import { Component, OnInit } from '@angular/core';
import { ThirdPersonService } from 'src/app/services/third-person.service';
import { DialogRef } from 'src/app/sharedModules/dialog/dialog-ref';
import { DialogConfig } from 'src/app/sharedModules/dialog/dialog-config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-brand-model-select',
  templateUrl: './brand-model-select.component.html',
  styleUrls: ['./brand-model-select.component.scss'],
})
export class BrandModelSelectComponent implements OnInit {
  carList = [];
  carFilteredList = [];
  selectedBrandCarList = [];
  selectedBrandCarFilterdList = [];
  step = 1;
  selectedBrand;
  environment;
  constructor(
    private thirdPersonService: ThirdPersonService,
    private dialog: DialogRef,
    public config: DialogConfig
  ) {
    this.environment=environment;
   }

  ngOnInit() {
    this.thirdPersonService.getCars().subscribe(carList => {
      if (carList) {
        this.carList = carList;
        this.carFilteredList = carList;
      }
    })
  }
  selectBrand(car) {
    this.selectedBrand = car;
    this.selectedBrandCarFilterdList = car.models;
    this.carFilteredList = this.carList;
    this.step = 2;
  }
  brandFilter(filterText) {
    this.carFilteredList = this.carList.filter(brand => brand.title.toLowerCase().includes(filterText.toLowerCase()));
  }
  carFilter(filterText) {
    this.selectedBrandCarFilterdList = this.selectedBrand.models.filter(car => car.title.toLowerCase().includes(filterText.toLowerCase()));
  }
  selectCar(model) {
    this.dialog.close(
      { brandTitle: this.selectedBrand.title, model: model }
    );
  }
}

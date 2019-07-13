import { Component, OnInit } from '@angular/core';
import { BrandSelectComponent } from './components/brand-select/brand-select.component';
import { ModelSelectComponent } from './components/model-select/model-select.component';
import { DeviceService } from '../../../../../../../services/device.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PersianCalendarService } from 'src/app/services/jalaliDate.service';
import { DialogService } from 'src/app/sharedModules/dialog/dialog.service';
import { DevicePreOrder, DeviceOrder } from '../../../../../../../viewModels/device.model';
import { LoadingService } from '../../../../../../../services/loading.service';




@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    PersianCalendarService
  ]
})
export class FilterComponent implements OnInit {
  selectedBrandTitle = "";
  selectedModelTitle = "";
  priceAmount;
  preOrder: DevicePreOrder;
  order: DeviceOrder;
  deviceList: any[] = [];
  paramSub;
  profileSubscribtion;
  groupNameOrKindId;
  showKindSelect: boolean = false;
  constructor(
    public dialog: DialogService,
    private deviceService: DeviceService,
    private router: Router,
    private rout: ActivatedRoute

  ) {
    this.preOrder = this.deviceService.getPreOrder();
    this.order = this.deviceService.getOrder();
    console.log(this.preOrder);
  }

  ngOnInit() {
    this.selectedBrandTitle = this.preOrder.brandTitle;
    this.selectedModelTitle = this.preOrder.modelTitle;
    this.priceAmount = this.preOrder.price;
    this.paramSub = this.rout.params.subscribe((x: Params) => {
      this.groupNameOrKindId = x['groupName'];
      let kinds = this.deviceService.deviceKinds.filter(x => x.group == this.groupNameOrKindId);
      if (this.groupNameOrKindId == 1 || this.groupNameOrKindId == 'mobile') {
        this.preOrder.deviceKindId = 1;
        this.preOrder.deviceKindTitle = this.deviceService.deviceKinds.find(x => x.deviceKindID == 1).title;
        this.showKindSelect = false;
      }
      else if (kinds.length === 0) {
        // id input
        this.preOrder.deviceKindId = this.groupNameOrKindId;
        this.preOrder.deviceKindTitle = this.deviceService.deviceKinds.find(x => x.deviceKindID == this.groupNameOrKindId).title;
        this.deviceList = this.deviceService.deviceKinds.filter(
          x => x.group == this.deviceService.deviceKinds.find(
            x => x.deviceKindID == this.groupNameOrKindId).group
        );
        this.showKindSelect = true;
      }
      else if (kinds.length > 0) {
        this.deviceList = kinds;
        this.showKindSelect = true;
      }
    });
  }
  chooseBrand() {
    const ref = this.dialog.open(BrandSelectComponent, { data: { header: "انتخاب برند", data: { deviceKindId: this.preOrder.deviceKindId } } });

    let ref_subiscripton = ref.afterClosed.subscribe(x => {
      if (x) {
        this.selectedBrandTitle = x.brandTitle;
        this.preOrder.brandTitle = x.brandTitle;
        this.preOrder.brandId = x.brandId;
      }
      ref_subiscripton.unsubscribe();

    });
  }

  chooseModel() {
    const ref = this.dialog.open(ModelSelectComponent, { data: { header: "انتخاب مدل", data: { deviceKindId: this.preOrder.deviceKindId, brandId: this.preOrder.brandId } } });
    let ref_subiscripton = ref.afterClosed.subscribe(x => {
      if (x) {
        this.selectedModelTitle = x.modelTitle;
        this.preOrder.modelId = x.modelId;
        this.preOrder.modelTitle = x.modelTitle;
      }
      ref_subiscripton.unsubscribe();

    });
  }

  isValidated() {
    if (this.preOrder.brandId && this.preOrder.modelId && this.priceAmount) {
      return true;
    }
    return false;
  }
  next() {
    console.log(this.preOrder);
    this.deviceService.savePreOrderToStorage();
    // this.router.navigateByUrl('/product/device/compare');
  }
  onSelectDevice() {
    this.preOrder.modelId = null;
    this.preOrder.modelTitle = '';
    this.preOrder.brandId = null;
    this.preOrder.brandTitle = '';
    this.selectedBrandTitle = '';
    this.selectedModelTitle = '';
    this.preOrder.deviceKindTitle = this.deviceService.deviceKinds.find(x => x.deviceKindID == this.preOrder.deviceKindId).title;
  }
  ngOnDestroy() {
    if (this.profileSubscribtion) {
      this.profileSubscribtion.unsubscribe();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/sharedModules/dialog/dialog.service';
import { PersianCalendarService } from 'src/app/services/jalaliDate.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../../../../../services/product.service';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { ProductConfig, ProductPreOrder } from '../../../../../../../viewModels/product.model';
import { environment } from '../../../../../../../../environments/environment';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    PersianCalendarService
  ]
})
export class FilterComponent implements OnInit {
  moduleName;
  moduleId;
  paramSub;
  settingSub;
  productSetting: ProductConfig;
  productBackground = "";
  environment = environment;

  availbeInuranceList = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.productSetting = null;
    this.paramSub = this.route.params.subscribe((x: Params) => {
      console.log("landing sub");
      this.moduleId = x["moduleId"];
      this.productService.getAvailableInsurance(this.moduleId)
        .then((x: any[]) => {
          this.availbeInuranceList = x;
        });
      this.moduleName = x["moduleName"];
      // this.moduleId = x["moduleId"];

      let preOrder: ProductPreOrder = {
        insurancetypeId: x["moduleId"],
        moduleName: this.moduleName,
        insurancePeriods: null,
        selectedProductId: null,
        availableInsuranceId: null
      }
      this.productService.setPreOrder(
        preOrder
      );
      this.settingSub = this.productService.getInsuranceSetting()
        .subscribe((result: ProductConfig) => {
          if (result) {
            this.productSetting = result;
            this.productBackground = `url(${environment.CDN}/private/downloads/${this.productSetting.landinPageImageFileName.toString()}/file')`;
            console.log(this.productBackground);
          }
        })
    })
    this.productService.removeOrder();
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
    this.settingSub.unsubscribe();
  }
  showModal(availableInsurance) {
    const modalRef = this.dialogService.open(DetailModalComponent, { data: { data: availableInsurance, header: availableInsurance.title } })
    modalRef.afterClosed.subscribe(x => {
      if (x) {
        this.router.navigateByUrl(`/product/custom-product/compare/${availableInsurance.id}`);
      }
    })
  }
}

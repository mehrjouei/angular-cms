import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlComponent } from './view/components/html/html.component';
import { SliderComponent } from './view/components/slider/slider.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabdionComponent } from './view/components/tabdion/tabdion.component';

@NgModule({
  declarations: [HtmlComponent, SliderComponent, TabdionComponent],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [
    HtmlComponent, SliderComponent
  ],
  entryComponents: [HtmlComponent, SliderComponent, TabdionComponent]
})
export class CmsModulesModule { }

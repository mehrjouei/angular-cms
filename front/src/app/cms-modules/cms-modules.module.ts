import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlComponent } from './components/html/html.component';
import { SliderComponent } from './components/slider/slider.component';
import { EditHtmlComponent } from './components/html/edit/edit-html.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HtmlComponent, SliderComponent, EditHtmlComponent],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [
    HtmlComponent, SliderComponent
  ],
  entryComponents: [HtmlComponent, EditHtmlComponent, SliderComponent]
})
export class CmsModulesModule { }

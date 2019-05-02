import { Component, OnInit } from '@angular/core';
import { ToolboxService } from '../../services/toolbox.service';
import { BusService } from '../../../services/bus.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PageService } from '../../../services/page.service';
import { Page } from '../../../models/page';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  modules: any[];
  containers: any[];
  panes;
  selected;

  form = this.fb.group({
    title: ['', Validators.required],
    selected: ['', Validators.required],
    pane: ['', Validators.required],
    container: ['', Validators.required],
  });

  constructor(
    private toolboxService: ToolboxService, private pageService: PageService,
    private bus: BusService, private fb: FormBuilder) { }

  ngOnInit() {
    this.toolboxService.getModules().subscribe((_: any) => {
      this.modules = _.data;
      this.toolboxService.getContainers().subscribe((__: any) => {
        this.containers = __.data;
      });
    });
    this.panes = document.querySelectorAll("[data-pane]");
    console.log(this.panes);
  }

  onModuleClick(module) {
    this.selected = module;
  }


  onSubmit() {
    const part = {
      module: this.form.value.selected,
      pane: this.form.value.pane,
      data: { content: 'salam' },
      title: this.form.value.title,
      container: this.form.value.container
    };
    const slug = window.location.href.split('/').slice(3).join('/');
    this.pageService.addPart(slug, part).subscribe((_: any) => {
      console.log('added!');
      this.bus.addModule({ // TODO in kos shere amalan
        module: this.selected,
        pane: this.form.value.pane,
        data: '{"content": "salam"}',
        title: this.form.value.title,
        container: this.form.value.container
      });
    });
  }

}

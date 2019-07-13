import { Component, OnInit } from '@angular/core';
import { Website } from '../../../models/website';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WebsiteService } from '../../../services/website.service';
import { DialogService } from '../../../sharedModules/dialog/dialog.service';
import { RoleMapDialogComponent } from './components/role-map-dialog/role-map-dialog.component';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {
  website: Website;

  form = this.fb.group({
    name: ['', Validators.required],
    url: ['', Validators.required],
    title: ['', Validators.required],
    favicon: ['', Validators.required],
    ip: ['', Validators.required],
    port: ['', Validators.required],
    location: ['', Validators.required],
    settings: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private websiteService: WebsiteService, public dialog: DialogService) { }

  ngOnInit() {
    this.websiteService.one().subscribe((w: any) => {
      this.website = w.data;
      this.form.setValue({
        name: this.website.name, url: this.website.url,
        title: this.website.title, favicon: this.website.favicon,
        ip: this.website.ip, port: this.website.port,
        location: this.website.location, settings: JSON.stringify(this.website.settings)
      });
    });
  }

  onSubmit(form: FormGroup) {
    const website: Website = {
      name: form.value.name, url: form.value.url,
      title: form.value.title, favicon: form.value.favicon,
      ip: form.value.ip, port: form.value.port,
      location: form.value.location, settings: JSON.parse(form.value.settings)
    };
    this.websiteService.update(website).subscribe(res => {
      alert(`edited!`);
    });
  }


  manageMappings() {
    this.dialog.open(RoleMapDialogComponent, { data: {
      doneBtnText: 'Confirm',
      rejectBtnText: 'Cancel',
      text: 'some stupid text'
    }});
  }

}

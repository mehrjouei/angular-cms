import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDetailComponent } from './footer-detail.component';

describe('FooterDetailComponent', () => {
  let component: FooterDetailComponent;
  let fixture: ComponentFixture<FooterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

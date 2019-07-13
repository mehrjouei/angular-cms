import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandModelSelectComponent } from './brand-model-select.component';

describe('BrandModelSelectComponent', () => {
  let component: BrandModelSelectComponent;
  let fixture: ComponentFixture<BrandModelSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandModelSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandModelSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

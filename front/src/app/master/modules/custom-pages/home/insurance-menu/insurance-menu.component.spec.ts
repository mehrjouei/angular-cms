import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceMenuComponent } from './insurance-menu.component';

describe('InsuranceMenuComponent', () => {
  let component: InsuranceMenuComponent;
  let fixture: ComponentFixture<InsuranceMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

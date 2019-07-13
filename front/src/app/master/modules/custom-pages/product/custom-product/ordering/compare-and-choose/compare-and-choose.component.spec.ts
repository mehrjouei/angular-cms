import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareAndChooseComponent } from './compare-and-choose.component';

describe('CompareAndChooseComponent', () => {
  let component: CompareAndChooseComponent;
  let fixture: ComponentFixture<CompareAndChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareAndChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareAndChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

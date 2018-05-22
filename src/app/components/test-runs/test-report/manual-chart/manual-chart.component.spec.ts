import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualChartComponent } from './manual-chart.component';

describe('ManualChartComponent', () => {
  let component: ManualChartComponent;
  let fixture: ComponentFixture<ManualChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

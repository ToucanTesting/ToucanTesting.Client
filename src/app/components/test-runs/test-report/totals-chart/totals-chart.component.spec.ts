import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsChartComponent } from './totals-chart.component';

describe('TotalsChartComponent', () => {
  let component: TotalsChartComponent;
  let fixture: ComponentFixture<TotalsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

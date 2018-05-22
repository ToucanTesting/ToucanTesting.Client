import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoChartComponent } from './auto-chart.component';

describe('AutoChartComponent', () => {
  let component: AutoChartComponent;
  let fixture: ComponentFixture<AutoChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

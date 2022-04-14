import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportChartComponent } from './detail-report-chart.component';

describe('DetailReportChartComponent', () => {
  let component: DetailReportChartComponent;
  let fixture: ComponentFixture<DetailReportChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailReportChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

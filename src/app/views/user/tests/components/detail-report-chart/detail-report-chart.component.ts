import { Component, OnInit } from '@angular/core';
import {
  ChartData,
  ChartOptions,
  ChartType,
} from 'chart.js';

@Component({
  selector: 'app-detail-report-chart',
  templateUrl: './detail-report-chart.component.html',
  styleUrls: ['./detail-report-chart.component.scss'],
})
export class DetailReportChartComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartData: ChartData = {

    labels: ['Listening', 'Reading', 'Writing', 'Speaking'],
    datasets: [{
      type: 'pie',
      data: [30,20,30, 10]
    }],
  };
  public pieChartLegend = false;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-overview-chart',
  templateUrl: './overview-chart.component.html',
  styleUrls: ['./overview-chart.component.scss']
})
export class OverviewChartComponent implements OnInit {


  public lineChartData: ChartData = {
    datasets: [{
      type: 'line',
      label: 'Your Average',
      data: [0,3.5,5,7.5,9,3.5,5]
    },
   ]
  };


  public lineChartLegend = false;

  constructor() { }

  ngOnInit(): void {
  }

}

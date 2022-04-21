import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-overview-chart',
  templateUrl: './overview-chart.component.html',
  styleUrls: ['./overview-chart.component.scss']
})
export class OverviewChartComponent implements OnInit {


  public lineChartData: ChartData = {
    labels: [0,1,2,3,5,6],
    datasets: [{
      type: 'line',
      label: 'You',
      data: [4.5,5,6,7.5,7,5.5],
    }, {
        type: 'line',
        label: 'Edmissions Average',
        data: [6.0, 6.0, 6.0, 6.0, 6.0,6.0],
        borderColor: 'green',
      }
    ]
  };


  public lineChartLegend = false;

  constructor() { }

  ngOnInit(): void {
  }

}

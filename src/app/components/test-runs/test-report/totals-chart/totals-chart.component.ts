import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'tt-totals-chart',
  templateUrl: './totals-chart.component.html',
  styleUrls: ['./totals-chart.component.scss']
})
export class TotalsChartComponent implements OnInit {
  totalsChart = [];
  @Input() totalTestCases: any;

  constructor() { }

  ngOnInit() {
    this.populateChart();
  }

  public populateChart() {
    const green = '#2BB673';
    const red = '#FE200B';
    const blue = '#4189C7'
    const gray = 'gray';

    this.totalsChart = new Chart('totalsChart', {
      type: 'doughnut',
      data: {
        labels: [
          `Automated (${this.totalTestCases.auto})`,
          `Manual (${this.totalTestCases.all - this.totalTestCases.auto})`
        ],
        datasets: [{
          data: [this.totalTestCases.auto, this.totalTestCases.all - this.totalTestCases.auto],
          backgroundColor: [
            green, blue, gray
          ]
        }]
      },
      options: {
        legend: {
          display: true,
          position: 'left'
        }
      }
    });
  }
}

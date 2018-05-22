import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'tt-manual-chart',
  templateUrl: './manual-chart.component.html',
  styleUrls: ['./manual-chart.component.scss']
})
export class ManualChartComponent implements OnInit {
  manualChart = [];
  @Input() manualTestCases: any;

  constructor() { }

  ngOnInit() {
    this.populateChart();
  }

  public populateChart() {
    const green = '#2BB673';
    const red = '#FE200B';
    const blue = '#4189C7'
    const gray = 'gray';

    this.manualChart = new Chart('manualChart', {
      type: 'doughnut',
      data: {
        labels: [
          `Pass (${this.manualTestCases.pass})`,
          `Fail (${this.manualTestCases.fail})`,
          `Could Not Test (${this.manualTestCases.cnt})`,
          `NA (${this.manualTestCases.na})`
        ],
        datasets: [{
          label: 'Results',
          data: [
            this.manualTestCases.pass,
            this.manualTestCases.fail,
            this.manualTestCases.pass,
            this.manualTestCases.na
          ],
          backgroundColor: [
            green, red, blue, gray
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

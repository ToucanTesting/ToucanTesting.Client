import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'tt-auto-chart',
  templateUrl: './auto-chart.component.html',
  styleUrls: ['./auto-chart.component.scss']
})
export class AutoChartComponent implements OnInit {
  autoChart = [];
  @Input() autoTestCases;

  constructor() { }

  ngOnInit() {
    this.populateChart();
  }

  public populateChart() {
    const green = '#2BB673';
    const red = '#FE200B';
    const blue = '#4189C7'
    const gray = 'gray';

    this.autoChart = new Chart('autoChart', {
      type: 'doughnut',
      data: {
        labels: [
          `Pass (${this.autoTestCases.pass})`,
          `Fail (${this.autoTestCases.fail})`,
          `Could Not Test (${this.autoTestCases.cnt})`,
          `NA (${this.autoTestCases.na})`
        ],
        datasets: [{
          label: 'Results',
          data: [
            this.autoTestCases.pass,
            this.autoTestCases.fail,
            this.autoTestCases.pass,
            this.autoTestCases.na
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

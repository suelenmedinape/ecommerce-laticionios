import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { StatusData, StatusItem } from '../../../autentication/interface/data';
import { isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../../autentication/service/data/dashboard.service';

@Component({
  selector: 'app-graphic-pie',
  standalone: true,
  templateUrl: './graphic-pie.component.html',
  styleUrl: './graphic-pie.component.css'
})
export class GraphicPieComponent {
  @ViewChild('chart') chartElement!: ElementRef;
  isBrowser: boolean;
  statusData: StatusData | null = null; // Tipo corrigido

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private dataService: DashboardService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngAfterViewInit() {
    if (this.isBrowser) {
      this.dataService.getStatusData().subscribe(data => {
        this.statusData = data;
        this.initChart();
      });
    }
  }

  private async initChart() {
    if (!this.statusData) return;

    const ApexCharts = (await import('apexcharts')).default;

    // Tipagem explícita nos parâmetros
    const seriesData = this.statusData.status.map((status: StatusItem) => 
      status.data.reduce((total: number, valor: number) => total + valor, 0)
    );

    const labels = this.statusData.status.map((status: StatusItem) => status.name);

    const options = {
      series: seriesData,
      chart: {
        type: 'pie',
        height: 350,
        toolbar: { show: false }
      },
      labels: labels,
      legend: { position: 'bottom' },
      colors: ['#F05252', '#0E9F6E'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: 'bottom' }
        }
      }]
    };

    const chart = new ApexCharts(this.chartElement.nativeElement, options);
    chart.render();
  }
}
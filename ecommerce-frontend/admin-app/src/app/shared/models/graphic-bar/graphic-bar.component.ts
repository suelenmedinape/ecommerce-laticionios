import { 
  Component, 
  AfterViewInit, 
  ViewChild, 
  ElementRef, 
  Inject,
  PLATFORM_ID 
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import ApexCharts from 'apexcharts';
import { DashboardService } from '../../../autentication/service/data/dashboard.service';
import { StatusData } from '../../../autentication/interface/data';

@Component({
  selector: 'app-graphic-bar',
  standalone: true,
  templateUrl: './graphic-bar.component.html',
  styleUrls: ['./graphic-bar.component.css']
})
export class GraphicBarComponent implements AfterViewInit {
  @ViewChild('chart') chartElement!: ElementRef;
  isBrowser: boolean;
  statusData: StatusData | null = null;

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
    
    // Transform the data from the service to the format expected by ApexCharts
    const series = this.statusData.status.map(item => ({
      name: item.name,
      type: 'bar',
      data: item.data
    }));
    
    // Get categories from the data or generate default ones if not provided
    const categories = this.statusData.mes || this.generateDefaultCategories(this.statusData.status[0].data.length);
    
    const options = {
      series: series,
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          borderRadiusApplication: 'end'
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: categories,
        type: 'category'
      },
      yaxis: {
        title: {
          text: 'Quantidade'
        },
        type: 'numeric'
      },
      legend: {
        position: 'top'
      },
      colors: ['#0E9F6E', '#F05252'] // Blue for finalizado, Green for solicitado, Orange for cancelado
    };
  
    const chart = new ApexCharts(this.chartElement.nativeElement, options);
    chart.render();
  }

  // Helper method to generate default categories if none are provided
  private generateDefaultCategories(count: number): string[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const categories: string[] = [];
    
    // Just use sequential numbers if we need more than 12 categories
    if (count > 12) {
      for (let i = 1; i <= count; i++) {
        categories.push(`Period ${i}`);
      }
    } else {
      // Use the first 'count' months
      for (let i = 0; i < count; i++) {
        categories.push(months[i]);
      }
    }
    
    return categories;
  }
}
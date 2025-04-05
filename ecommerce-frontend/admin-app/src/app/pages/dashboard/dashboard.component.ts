import { Component } from '@angular/core';
import { DashboardCardComponent } from '../../shared/models/card-dashboard/card-dashboard.component';
import { GraphicBarComponent } from "../../shared/models/graphic-bar/graphic-bar.component";
import { GraphicPieComponent } from "../../shared/models/graphic-pie/graphic-pie.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardCardComponent, GraphicBarComponent, GraphicPieComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  cardConfigs = {
    finish: {
      title: "Finalizados no Mês",
      endpoint: "completedMonthly" as const,
      icon: "finish",
    },
    sales: {
      title: "Vendas Totais",
      endpoint: "totalSales" as const,
      icon: "sales",
    },
    day: {
      title: "Pedidos Feitos Hoje",
      endpoint: "solicitedToday" as const,
      icon: "day",
    },
  }
}

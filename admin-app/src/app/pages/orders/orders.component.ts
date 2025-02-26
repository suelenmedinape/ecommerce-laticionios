import { Component } from '@angular/core';
import { PaginationComponent } from "../../shared/_component/pagination/pagination.component";
import { OrdersService } from '../../autentication/service/order/orders.service';
import { CurrencyPipe } from '@angular/common';
import { OrderStatusComponent } from "../../shared/models/order-status/order-status.component";

@Component({
  selector: 'app-orders',
  imports: [PaginationComponent, CurrencyPipe, OrderStatusComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: { id: number; date: Date; totalValue: number; orderStatus: string }[] = [];

  constructor(private orderService: OrdersService) { }

  listOrders() {
    this.orderService.listOrders().subscribe((data: any) => {
      this.orders = data;
    });
  }
}

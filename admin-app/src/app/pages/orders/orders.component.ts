import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../autentication/service/order/orders.service';
import { CurrencyPipe } from '@angular/common';
import { OrderStatusComponent } from '../../shared/models/order-status/order-status.component';
import { PaginationComponent } from '../../shared/_component/pagination/pagination.component';
import { FormsModule } from '@angular/forms';

export interface Order {
  id: number;
  date: string; // Apenas a data no formato YYYY-MM-DD
  totalValue: number;
  orderStatus: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [CurrencyPipe, OrderStatusComponent, PaginationComponent, FormsModule]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  selectedStatus: string = 'SOLICITADO';

  isDeleteModalOpen: boolean = false;
  isInfoModalOpen: boolean = false;

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.listOrders();
  }

  /* ARRUMAR A DATA */
  listOrders() {
    this.orderService.listOrders().subscribe(
        (data: any[]) => { 
            this.orders = data.map(order => {
                const date = new Date(order.date);
                return {
                    ...order,
                    date: isNaN(date.getTime()) ? "Data Inválida" : date.toISOString().split('T')[0]
                };
            });
        },
        (error: any) => {
            console.error("Erro ao listar pedidos:", error);
            this.orders = []; 
        }
    );
}



  updateStatus(id: number, status: string) {
    this.orderService.updateStatus(id, this.selectedStatus).subscribe(() => {
      this.listOrders();
    });
  }

  showDeleteModal() {
    this.isDeleteModalOpen = true;
    this.isInfoModalOpen = false;
  }

  showInfoModal() {
    this.isInfoModalOpen = true;
    this.isDeleteModalOpen = false;
  }

  closeModal() {
    this.isDeleteModalOpen = false;
    this.isInfoModalOpen = false;
  }
}

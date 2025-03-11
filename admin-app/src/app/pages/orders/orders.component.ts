import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../autentication/service/order/orders.service';
import { CurrencyPipe } from '@angular/common';
import { OrderStatusComponent } from '../../shared/models/order-status/order-status.component';
import { PaginationComponent } from '../../shared/_component/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { Order } from '../../autentication/interface/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [OrderStatusComponent, PaginationComponent]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = []
  selectedOrderItems: any[] = [] // Propriedade para armazenar os itens do pedido selecionado
  orderTotal = 0 // Propriedade para armazenar o valor total do pedido

  itemsPerPage = 10 // Quantos produtos por página
  currentPage = 1 // Página inicial

  showOrderDetails = false
  selectedOrderId: number | null = null
  orderStatusSelected: string | null = null
  selectedStatus = "TODOS"

  isOpen = false

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.listOrders()
  }

  listOrders() {
    this.ordersService.listOrders().subscribe((response: any) => {
      this.orders = response
    })
  }

  dateFormated(date: string) {
    return new Date(date).toLocaleDateString("pt-BR")
  }

  cancelOrder(id: number) {
    this.ordersService.updateStatus(id, "cancelado").subscribe(() => {
      this.listOrders()
    })
  }

  finalizarOrder(id: number) {
    this.ordersService.updateStatus(id, "finalizado").subscribe(() => {
      this.listOrders()
      this.showOrderDetails = false
      this.selectedOrderId = null
    })
  }

  get totalPages() {
    return Math.ceil(this.orders.length / this.itemsPerPage)
  }

  onPageChange(page: number): void {
    this.currentPage = page
  }

  viewOrderDetails(orderId: number, orderStatus: string): void {
    this.selectedOrderId = orderId
    this.orderStatusSelected = orderStatus

    // Buscar os detalhes do pedido quando o modal é aberto
    this.ordersService.findOrderById(orderId).subscribe((response: any) => {
      this.selectedOrderItems = response.items
      this.orderTotal = response.totalValue
      this.showOrderDetails = true
    })
  }

  closeOrderDetails(): void {
    this.showOrderDetails = false
    this.selectedOrderId = null
    this.selectedOrderItems = []
    this.orderTotal = 0
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen
  }

  applyFilter(status: string): void {
    this.selectedStatus = status
    this.isOpen = false

    if (status === "TODOS") {
      this.listOrders()
    } else {
      this.ordersService.filterByStatus(status).subscribe((response: any) => {
        this.orders = response
      })
    }
  }

  findOrderById(id: number): void {
    this.ordersService.findOrderById(id).subscribe((response: any) => {
      this.orders = [response] // Coloca o pedido encontrado em um array
    })
  }
}
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  @Input() levelSatatus: string = '';
}

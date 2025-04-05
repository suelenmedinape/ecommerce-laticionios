import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quantity-status',
  standalone: true,
  imports: [NgClass],
  templateUrl: './quantity-status.component.html',
  styleUrl: './quantity-status.component.css'
})
export class QuantityStatusComponent {
    @Input() quantity = 0
    get statusClass(): string {
        if (this.quantity <= 10) {
            return "bg-red-700";
        } else if (this.quantity > 10 && this.quantity < 15) {
            return "bg-orange-500";
        } else if (this.quantity >= 15) {
            return "bg-green-400";
        } else {
            return "bg-yellow-300";
        }
    }
}

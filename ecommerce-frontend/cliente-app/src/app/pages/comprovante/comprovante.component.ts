import { Component, inject, type OnInit, signal, ViewChild } from "@angular/core"
import { CommonModule, DatePipe } from "@angular/common"
import { ActivatedRoute } from "@angular/router"
import { switchMap } from "rxjs/operators"
import {AccountService} from '../../autentication/service/account/account.service';
import {Cart} from '../../autentication/interface/cart/cart-product';
import {Client} from '../../autentication/interface/account/user';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: "app-comprovante",
  standalone: true, 
  imports: [CommonModule, DatePipe],
  templateUrl: "./comprovante.component.html",
})
export class ComprovanteComponent implements OnInit {
  @ViewChild('content') content: any
  
  private route = inject(ActivatedRoute)
  private orderService = inject(AccountService)
  private clientService = inject(AccountService)

  cartItems = signal<Cart[]>([])
  client = signal<Client | null>(null)
  loading = signal(true)
  currentDate = new Date()

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get("id"))
          return this.orderService.getOrderDetails(id)
        }),
      )
      .subscribe({
        next: (cartData) => {
          this.cartItems.set(cartData)
          this.clientService.clientDetails().subscribe({
            next: (clientData) => {
              this.client.set(clientData)
              this.loading.set(false)
            },
            error: (error) => {
              console.error("Error fetching client data:", error)
              this.loading.set(false)
            },
          })
        },
        error: (error) => {
          console.error("Error fetching order data:", error)
          this.loading.set(false)
        },
      })
  }

  calculateTotal(): number {
    return this.cartItems().reduce((total, item) => total + item.totalPrice, 0)
  }

  baixarComprovante(){
    const content = this.content.nativeElement;

    html2canvas(content).then((canvas: any) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('comprovante.pdf');
    });
  }
}


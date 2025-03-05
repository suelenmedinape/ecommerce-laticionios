import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../../../autentication/interface/account/user';
import { AccountService } from '../../../../autentication/service/account/account.service';
import { NgClass, NgIf } from '@angular/common';
import { Orders } from '../../../../autentication/interface/account/orders';
import { OrdersComponent } from '../../../../shared/models/orders/orders.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, OrdersComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  cliente: Client | null = null
  orders: Orders[] = []
  clientForm: FormGroup
  isEditing = false

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
  ) {
    this.clientForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: [""],
      cpf: [""],
      address: this.fb.group({
        street: [""],
        number: [""],
        neighborhood: [""],
        state: [""],
      }),
    })
  }

  ngOnInit(): void {
    this.clientDetails()
    this.listAllOrders()
  }

  clientDetails(): void {
    this.accountService.clientDetails().subscribe({
      next: (client) => {
        this.cliente = client
        this.resetForm()
      },
      error: (err) => {
        console.error("Erro ao carregar detalhes do cliente:", err)
      },
    })
  }

  resetForm(): void {
    if (this.cliente) {
      this.clientForm.patchValue({
        name: this.cliente.name,
        email: this.cliente.email,
        phone: this.cliente.phone || "",
        cpf: this.cliente.cpf || "",
        address: this.cliente.address || {
          street: "",
          number: "",
          neighborhood: "",
          state: "",
        },
      })
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing
    if (!this.isEditing) {
      this.resetForm()
    }
  }

  updateDetails(): void {
    if (this.clientForm.valid) {
      const updatedClient = this.clientForm.value

      this.accountService.updateDetails(updatedClient).subscribe({
        next: (response) => {
          this.cliente = response
          this.isEditing = false
          this.clientDetails();
          console.log("Cliente atualizado com sucesso!")
        },
        error: (err) => {
          console.error("Erro ao atualizar cliente:", err)
        },
      })
    } else {
      Object.keys(this.clientForm.controls).forEach((key) => {
        const control = this.clientForm.get(key)
        control?.markAsTouched()
      })
    }
  }

  get addressForm() {
    return this.clientForm.get("address") as FormGroup
  }

  listAllOrders(): void {
    this.accountService.listAllOrders().subscribe(
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

  cancelOrder(id: number): void {
    this.accountService.cancelOrder(id).subscribe({
      next: (response) => {
        this.listAllOrders()
        console.log("Pedido cancelado com sucesso!")
      },
      error: (err) => {
        console.log(id)
        console.error("Erro ao cancelar pedido:", err)
      },
    })
  }
}
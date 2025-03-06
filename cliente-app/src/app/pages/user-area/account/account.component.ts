import { AsyncPipe } from "@angular/common"
import { Component, OnInit, OnDestroy } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AccountService } from "../../../autentication/service/profile/account.service"
import { AccountDetails } from "../../../autentication/interface/account-details"
import { AlertComponent } from "../../../shared/models/alert/alert.component"


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AsyncPipe, FormsModule, AlertComponent],
  providers: [AccountService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  name: string = "";
  email: string = "";
  phone: string = "";
  id: number = 0;
  rua: string = "";
  numero: string = "";
  bairro: string = "";
  estado: string = "";
  cpf: string = "";

  showAlert: boolean = false;
  message: string = "";
  categAlert: number = 0;

  constructor(private accountService: AccountService) { }

  accountDetails: AccountDetails | undefined = undefined;

  ngOnInit() {
    this.listAccountDetails();
  }

  listAccountDetails() {
    this.accountService.getAccountDetails().subscribe(
      (response) => {
        console.log(response); // Veja o que está vindo da API
        this.accountDetails = response; // Atribuindo a resposta ao array/objeto correto
      },
      (error) => {
        console.error('Erro ao buscar detalhes da conta:', error);
      }
    );
  }

  selectedAccount: AccountDetails | undefined; // Variável para armazenar os dados do usuário selecionado

  // Função para abrir o modal e preencher os campos
  openEditModal(account: AccountDetails) {
    this.selectedAccount = account;
  
    // Preenche os campos com os dados da conta selecionada
    this.name = this.selectedAccount.name;
    this.phone = this.selectedAccount.phone;
    this.rua = this.selectedAccount.address.street; 
    this.numero = this.selectedAccount.address.number;
    this.bairro = this.selectedAccount.address.neighborhood;
    this.estado = this.selectedAccount.address.state;
    this.cpf = this.selectedAccount.cpf;
  
    // Abre o modal
    this.isInfoModalOpen = true;
  }
  
  

  addProduct(event: Event) {
    event.preventDefault();
  
    const clientUpdateDTO = {
      name: this.name,
      phone: this.phone,
      address: {
        id: this.selectedAccount?.address.id,  // Envia o id do endereço
        street: this.rua,
        number: this.numero,
        neighborhood: this.bairro,
        state: this.estado
      },
      cpf: this.cpf
    };
  
    this.accountService.updateAccountDetails(clientUpdateDTO).subscribe({
      next: () => {
        this.showAlert = true;
        this.message = "Edição concluída com sucesso!";
        this.categAlert = 3;
  
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: (error) => {
        console.error('Error:', error);
        this.showAlert = true;
        this.message = "Falha na edição.";
        this.categAlert = 2;
      }
    });
  }
  

  isDeleteModalOpen: boolean = false;
  isInfoModalOpen: boolean = false;

  showDeleteModal() {
    this.isDeleteModalOpen = true;
    this.isInfoModalOpen = false;
  }

  closeModal() {
    this.isDeleteModalOpen = false;
    this.isInfoModalOpen = false;
  }
}
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../autentication/service/auth/user.service';
import { AlertComponent } from '../../../shared/models/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, AlertComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = "";
  email = "";
  password = "";
  showAlert: boolean = false;
  message: string = "";
  categAlert: number = 0;

  private userService = inject(UserService);
  private router = inject(Router);
 
  onSubmit() {
    this.userService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.showAlert = true;
        this.message = "Registro concluído com sucesso! Fazendo login automaticamente...";
        this.categAlert = 3;

        this.userService.login(this.email, this.password).subscribe({
          next: (response) => {
            this.router.navigate(["/"]);
            this.showAlert = true;
            this.message = "Login automático bem-sucedido!";
            this.categAlert = 3;
          },
          error: (loginError) => {
            this.router.navigate(["/login"]);
            this.showAlert = true;
            this.message = "O registro foi concluído, mas houve um erro ao fazer login. Por favor, faça login manualmente.";
            this.categAlert = 2;
          }
        });
      },
      error: (error) => {
        this.showAlert = true;
        this.message = "Falha no registro. Por favor, tente novamente.";
        this.categAlert = 2;
      }
    });
  }
}

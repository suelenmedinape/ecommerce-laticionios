import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../autentication/service/auth/user.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../shared/models/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = ""
  password = ""
  showAlert: boolean = false;
  message: string = "";
  categAlert: number = 0;

  private userService = inject(UserService)
  private router = inject(Router)

  // login.component.ts
  onSubmit() {
    console.log("Tentando login com:", this.email, this.password); 
    this.userService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate(["/"]);
        this.showAlert = true;
        this.message = "Login bem-sucedido!";
        this.categAlert = 3;
      },
      error: (error) => {
        this.showAlert = true;
        this.message = "Falha no login. Por favor, tente novamente.";
        this.categAlert = 2;
      },
    });
  }
} 

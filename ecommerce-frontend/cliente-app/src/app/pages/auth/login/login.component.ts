import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../autentication/service/auth/user.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../shared/models/alert/alert.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, AlertComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  email = "" 
  password = ""
  showAlert = false
  message = ""
  categAlert = 0
  userRole: string | null = null
  private subscription: Subscription | null = null

  private userService = inject(UserService)
  private router = inject(Router)

  ngOnInit() {
    this.subscribeToUserRole()
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onSubmit() {
    console.log("Tentando login com:", this.email, this.password)
    this.userService.login(this.email, this.password).subscribe({
      next: () => {
        console.log("Login bem-sucedido!")
        this.showAlert = true
        this.message = "Login bem-sucedido!"
        this.categAlert = 3
      },
      error: (error) => {
        console.error("Erro no login:", error)
        this.showAlert = true
        this.message = "Falha no login. Por favor, tente novamente."
        this.categAlert = 2
      },
    })
  }

  private subscribeToUserRole(): void {
    this.subscription = this.userService.userRole$.subscribe((role: string | null) => {
      console.log("User role updated in LoginComponent:", role)
      this.userRole = role

      if (role === "ROLE_ADMIN") {
        this.router.navigate(["/admin"])
      } else if (role) {
        this.router.navigate(["/"])
      }
    })
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
 
@Injectable({
  providedIn: 'root',
})

export class UserService {
  private apiUrl = '/auth';
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.initializeAuthState();
  }

  private initializeAuthState() {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.role || null; // Trata role ausente
        this.setUserRole(role);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap((response) => {
        console.log('Login response:', response);
        if (response.token) {
          this.setToken(response.token);
          const decodedToken: any = jwtDecode(response.token);
          this.setUserRole(decodedToken.role);
        } else {
          console.error('No token received in the response');
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { name, email, password }, { withCredentials: true }).pipe(
      tap((response) => {
        console.log('Registration response:', response); // Log para depuração
      }),
      catchError((error) => {
        console.error('Erro completo:', error); // Log detalhado
        console.error('Mensagem do servidor:', error.error); // Corpo da resposta do backend
        return throwError(error);
      })
    );
  }

  logout() {
    this.cookieService.delete('auth_token', '/'); // Adicione o path '/'
    this.userRoleSubject.next(null);
  }

  getToken(): string | null {
    return this.cookieService.get('auth_token') || null;
  }

  private setToken(token: string) {
    const expirationHours = 4;
    const expirationDate = new Date(Date.now() + expirationHours * 60 * 60 * 1000);
  
    this.cookieService.set('auth_token', token, {
      expires: expirationDate, 
      path: '/', 
      secure: true, 
      sameSite: 'None',  // Permite que seja enviado para outro domínio
      domain: 'localhost' // Isso permite o uso em subdomínios como 4200 e 4201
    });
  }  

  private setUserRole(role: string | null) {
    this.userRoleSubject.next(role);
  }
}
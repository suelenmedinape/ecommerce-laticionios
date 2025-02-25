import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '../../../autentication/service/profile/account.service';
import { catchError, Observable, of, Subject } from 'rxjs';
import { AccountDetails } from '../../../autentication/interface/account-details';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AsyncPipe],
  providers: [AccountService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnDestroy {
    clientDetails$: Observable<AccountDetails | null>;
    error: string | null = null;
    private destroy$ = new Subject<void>();
  
    constructor(private accountService: AccountService) {
      this.clientDetails$ = this.accountService.getAccountDetails().pipe(
        catchError((err) => {
          this.error = "Failed to load client details. Please try again later.";
          console.error("Error fetching client details:", err);
          return of(null); // Retorna um observable nulo para evitar quebra do fluxo
        })
      );
    }
  
    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
}

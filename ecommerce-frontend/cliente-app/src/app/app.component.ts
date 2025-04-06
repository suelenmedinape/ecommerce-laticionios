import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { initAccordions,initCarousels,initCollapses,initDials,initDismisses,initDrawers,initDropdowns,initModals,initPopovers,initTabs,initTooltips,} from 'flowbite';
import { FooterComponent } from './shared/_component/footer/footer.component';
import { NavbarComponent } from './shared/_component/navbar/navbar.component';
import { filter } from 'rxjs';
import { UserService } from './autentication/service/auth/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cliente-app';
  showNavbar:boolean = true;

  constructor(private router: Router, private userService: UserService) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd) // Filtra apenas NavigationEnd
      )
      .subscribe((event: any) => {
        const hiddenRoutes = ['/login', '/register', '/comprovante']; // Rotas onde o navbar não aparece
        this.showNavbar = !hiddenRoutes.includes(event.url);
      });
  }

  ngOnInit(): void {
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
  }
}

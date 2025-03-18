import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isOpen = false;
  isOpen2 = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  toggleDropdown2() {
    this.isOpen2 = !this.isOpen2;
  }

  toggleDarkMode(): void {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark'); // Removendo a classe "dark"
      localStorage.setItem('color-theme', 'light'); // Salvando a escolha no localStorage
    } else {
      document.documentElement.classList.add('dark'); // Adicionando a classe "dark"
      localStorage.setItem('color-theme', 'dark'); // Salvando a escolha no localStorage
    }
  }  
}

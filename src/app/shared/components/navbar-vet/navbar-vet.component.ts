import { Component } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Vet {
  nombre?: string;
  imagen_perfil?: string;
}

@Component({
  selector: 'app-navbar-vet',
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar-vet.component.html',
  styleUrls: ['./navbar-vet.component.css']
})
export class NavbarVetComponent {
  isMenuOpen = false;
  currentVet: Vet | null = null;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    // Implementa tu lógica de logout aquí
  }
} 
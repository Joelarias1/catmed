// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Shared Components
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NavbarUserComponent } from './shared/components/navbar-user/navbar-user.component';
import { NavbarVetComponent } from './shared/components/navbar-vet/navbar-vet.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    NavbarComponent, 
    NavbarUserComponent,
    FooterComponent,  
    NavbarVetComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentNavbar = 'public';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Obtener el tipo de navbar de la ruta actual
      const root = this.router.routerState.snapshot.root;
      const navbarType = root.firstChild?.data['navbar'];
      if (navbarType) {
        this.currentNavbar = navbarType;
      }
    });
  }
}
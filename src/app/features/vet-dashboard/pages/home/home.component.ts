import { Component } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponentVet {
  // Aquí irá la lógica del componente
} 
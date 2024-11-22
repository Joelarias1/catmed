import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, NgIconsModule],
  templateUrl: './pets.component.html'
})
export class PetsComponent {
  // TODO: Aquí podríamos agregar la lógica para añadir mascotas
}

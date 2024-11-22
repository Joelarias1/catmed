import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, NgIconsModule],
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent {
  // Aquí podríamos agregar la lógica para manejar las citas
}

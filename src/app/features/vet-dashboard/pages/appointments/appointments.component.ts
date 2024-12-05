import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [NgIconComponent, NgClass],
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent {
  // Aquí irá la lógica del componente
}

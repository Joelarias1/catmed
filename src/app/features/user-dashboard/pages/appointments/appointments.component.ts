import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, NgIconsModule, RouterLink],
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent {
  // TODO:Aquí podríamos agregar la lógica para manejar las citas
}

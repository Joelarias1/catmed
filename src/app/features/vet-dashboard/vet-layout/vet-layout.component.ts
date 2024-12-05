import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vet-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './vet-layout.component.html',
  styleUrls: ['./vet-layout.component.css']
})
export class VetLayoutComponent {
} 
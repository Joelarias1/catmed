import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      location: ['']
    });
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      console.log('Búsqueda iniciada:', this.searchForm.value);
      // Aquí implementaremos la lógica de búsqueda
    }
  }
}

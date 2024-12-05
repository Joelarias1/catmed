import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { Cat } from '../../../../core/interfaces/user.interface';
import { 
  bootstrapPencil, 
  bootstrapCheck,
  bootstrapX,
  bootstrapDroplet,
  bootstrapHeart,
  bootstrapStar,
  bootstrapCamera,
  bootstrapClock,
  bootstrapFileText,
  bootstrapPlusCircle
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, NgIconsModule, FormsModule, ReactiveFormsModule],
  providers: [
    provideIcons({ 
      bootstrapPencil, 
      bootstrapCheck,
      bootstrapX,
      bootstrapDroplet,
      bootstrapHeart,
      bootstrapStar,
      bootstrapCamera,
      bootstrapClock,
      bootstrapFileText,
      bootstrapPlusCircle
    })
  ],
  templateUrl: './pets.component.html'
})
export class PetsComponent implements OnInit {
  currentCat: Cat | null = null;
  editForm: FormGroup;
  isEditing = false;

  readonly edadMascota = [
    { value: '', label: 'Selecciona la edad' },
    { value: '0', label: 'Menos de 1 año' },
    { value: '1', label: '1-3 años' },
    { value: '4', label: '4-7 años' },
    { value: '8', label: '8-12 años' },
    { value: '12', label: 'Más de 12 años' }
  ];

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      nombre: [{value: '', disabled: true}, [Validators.required]],
      edad: [{value: '', disabled: true}, [Validators.required]],
      raza: [{value: '', disabled: true}]
    });
  }

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    this.currentCat = user?.cats?.[0] || null;
    if (this.currentCat) {
      this.editForm.patchValue({
        nombre: this.currentCat.nombre,
        edad: this.currentCat.edad,
        raza: this.currentCat.raza || ''
      });
    }
  }

  getEdadLabel(edad: string): string {
    const edadOption = this.edadMascota.find(e => e.value === edad);
    return edadOption?.label || edad + ' años';
  }

  startEditing() {
    this.isEditing = true;
    Object.keys(this.editForm.controls).forEach(key => {
      const control = this.editForm.get(key);
      if (control) {
        control.enable();
      }
    });
  }

  cancelEditing() {
    this.isEditing = false;
    if (this.currentCat) {
      this.editForm.patchValue({
        nombre: this.currentCat.nombre,
        edad: this.currentCat.edad,
        raza: this.currentCat.raza || ''
      });
    }
    Object.keys(this.editForm.controls).forEach(key => {
      const control = this.editForm.get(key);
      if (control) {
        control.disable();
      }
    });
  }

  saveChanges() {
    if (!this.currentCat || !this.editForm.valid) return;

    const updatedCat: Cat = {
      ...this.currentCat,
      nombre: this.editForm.getRawValue().nombre,
      edad: this.editForm.getRawValue().edad,
      raza: this.editForm.getRawValue().raza
    };

    this.userService.updateCat(updatedCat).subscribe({
      next: (user) => {
        this.currentCat = user.cats[0];
        this.isEditing = false;
        Object.keys(this.editForm.controls).forEach(key => {
          const control = this.editForm.get(key);
          if (control) {
            control.disable();
          }
        });
      },
      error: (error) => {
        console.error('Error al actualizar el gato:', error);
        alert('Error al actualizar los datos. Por favor, intenta nuevamente.');
      }
    });
  }
}

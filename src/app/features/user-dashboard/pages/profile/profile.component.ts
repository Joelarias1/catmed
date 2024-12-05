import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/interfaces/user.interface';
import { Router } from '@angular/router';
import { 
  bootstrapPencil, 
  bootstrapCamera,
  bootstrapTrash
} from '@ng-icons/bootstrap-icons';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NgIconsModule, ModalComponent],
  providers: [
    provideIcons({ 
      bootstrapPencil, 
      bootstrapCamera,
      bootstrapTrash
    })
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  showDeleteModal = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  showDeleteConfirmation() {
    this.showDeleteModal = true;
  }

  onConfirmDelete() {
    if (!this.currentUser) return;

    this.userService.deleteUser(this.currentUser.id).subscribe({
      next: () => {
        this.userService.logout();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al eliminar la cuenta:', error);
        alert('Error al eliminar la cuenta. Por favor, intenta nuevamente.');
      }
    });
  }

  onCancelDelete() {
    this.showDeleteModal = false;
  }
}
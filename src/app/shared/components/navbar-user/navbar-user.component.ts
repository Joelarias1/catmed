import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/interfaces/user.interface';
import {
  bootstrapList,
  bootstrapX,
  bootstrapCalendar2Check,
  bootstrapCalendarPlus,
  bootstrapHeart,
  bootstrapBoxArrowRight
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-navbar-user',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  providers: [
    provideIcons({
      bootstrapList,
      bootstrapX,
      bootstrapCalendar2Check,
      bootstrapCalendarPlus,
      bootstrapHeart,
      bootstrapBoxArrowRight
    })
  ],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.css'
})
export class NavbarUserComponent implements OnInit {
  isMenuOpen = false;
  currentUser: User | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async logout() {
    try {
      this.userService.logout();
      await this.router.navigate(['/login']);
    } finally {
      this.isMenuOpen = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/interfaces/user.interface';
import { bootstrapSearch } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({ 
      bootstrapSearch, 
    })
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  get userCat() {
    return this.currentUser?.cats[0] || null;
  }
}

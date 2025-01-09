import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent {
  users: any[] = [];

  constructor(private authService: AuthService) {
    this.loadUsers();
  }

  private loadUsers() {
    const users = localStorage.getItem(this.authService.usersKey);
    this.users = users ? JSON.parse(users) : [];
  }

  deleteUser(username: string) {
    this.users = this.users.filter(user => user.username !== username);
    localStorage.setItem(this.authService.usersKey, JSON.stringify(this.users));
  }
}

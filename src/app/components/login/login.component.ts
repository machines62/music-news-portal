import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required!';
      return;
    }

    const loginSuccess = this.authService.login(this.username, this.password);
    if (loginSuccess) {
      this.errorMessage = '';
      alert(`Welcome, ${this.username}!`);
      this.router.navigate(['/trending-news']); // Preusmjeri na zaštićenu rutu
    } else {
      this.errorMessage = 'Invalid username or password!';
    }
  }
}
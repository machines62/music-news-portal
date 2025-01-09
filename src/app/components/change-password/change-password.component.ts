import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword, confirmPassword } = this.changePasswordForm.value;
      const username = this.authService.getCurrentUser().username;

      if (newPassword !== confirmPassword) {
        this.errorMessage = 'New password and confirm password do not match!';
        return;
      }

      const changeSuccess = this.authService.changePassword(username, oldPassword, newPassword);

      if (changeSuccess) {
        alert('Password changed successfully!');
        this.router.navigate(['/trending-news']); // Preusmjeri na stranicu sa vijestima
      } else {
        this.errorMessage = 'Invalid old password!';
      }
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TrendingNewsComponent } from './components/trending-news/trending-news.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component'; // Import AdminUsersComponent
import { ChangePasswordComponent } from './components/change-password/change-password.component'; // Import ChangePasswordComponent
import { AuthGuard } from './guards/auth.guard'; // Import AuthGuard

export const routes: Routes = [
  { path: '', redirectTo: 'trending-news', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] }, // Zaštićena ruta
  { path: 'trending-news', component: TrendingNewsComponent, canActivate: [AuthGuard] }, // Zaštićena ruta
  { path: 'admin-users', component: AdminUsersComponent, canActivate: [AuthGuard] }, // Zaštićena ruta za admin korisnike
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] }, // Zaštićena ruta za promjenu šifre
  { path: '**', redirectTo: 'trending-news' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

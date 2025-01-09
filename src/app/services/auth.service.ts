import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' },
  ];

  private currentUser: any = null; // Čuva trenutno prijavljenog korisnika

  // Funkcija za prijavu korisnika
  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.currentUser = user; // Postavi trenutno prijavljenog korisnika
      return true;
    }
    return false;
  }

  // Funkcija za odjavu korisnika
  logout(): void {
    this.currentUser = null; // Postavi korisnika na null prilikom odjave
  }

  // Provjera da li je korisnik prijavljen
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Dohvati trenutno prijavljenog korisnika
  getCurrentUser(): any {
    return this.currentUser;
  }

  // Funkcija za promjenu šifre
  changePassword(username: string, oldPassword: string, newPassword: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === oldPassword
    );
    if (user) {
      user.password = newPassword; // Ažuriraj šifru
      return true;
    }
    return false;
  }

  // Dohvati ulogu trenutno prijavljenog korisnika
  getRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }
}

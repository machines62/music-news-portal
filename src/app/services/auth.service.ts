import { Injectable } from '@angular/core';

interface User {
  username: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public usersKey = 'users';
  private currentUser: any = null; // Čuva trenutno prijavljenog korisnika

  constructor() {
    if (this.isBrowser()) {
      // Učitaj korisnike iz localStorage samo ako je na klijentskoj strani
      const savedUsers = localStorage.getItem(this.usersKey);
      if (!savedUsers) {
        localStorage.setItem(this.usersKey, JSON.stringify(this.getDefaultUsers()));
      }
    }
  }

  private getDefaultUsers(): User[] {
    return [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'user', password: 'user123', role: 'user' },
    ];
  }

  register(username: string, password: string, role: string): boolean {
    if (!this.isBrowser()) return false; // Provjeri da li je na klijentskoj strani

    const users = this.getUsers();
    if (users.find(u => u.username === username)) {
      return false; // Korisničko ime već postoji
    }

    users.push({ username, password, role });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    if (!this.isBrowser()) return false; // Provjeri da li je na klijentskoj strani

    const users = this.getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.currentUser = user; // Postavi trenutno prijavljenog korisnika
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null; // Postavi korisnika na null prilikom odjave
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  changePassword(username: string, oldPassword: string, newPassword: string): boolean {
    if (!this.isBrowser()) return false; // Provjeri da li je na klijentskoj strani

    const users = this.getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === oldPassword
    );
    if (user) {
      user.password = newPassword; // Ažuriraj šifru
      localStorage.setItem(this.usersKey, JSON.stringify(users));
      return true;
    }
    return false;
  }

  getRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }

  private getUsers(): User[] {
    if (!this.isBrowser()) return this.getDefaultUsers(); // Provjeri da li je na klijentskoj strani

    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : this.getDefaultUsers();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}

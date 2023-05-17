import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken() {
    localStorage.setItem('token', 'asdf1234');
  }

  clearToken() {
    localStorage.clear();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  incorrectPass?: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  login() {
    if (this.username == 'moviedatabase' && this.password == '12345678') {
      this.router.navigate(['home']);
      this.authService.setToken();
    } else {
      this.incorrectPass = true;
      this.username = "";
      this.password = "";
    }
  }

  forgotPassword() {
    this.username = 'moviedatabase';
    this.password = '12345678';
    this.removeIncorrectText();
  }

  removeIncorrectText() {
    if (this.incorrectPass) {
      this.incorrectPass = !this.incorrectPass;
    }
  }
}

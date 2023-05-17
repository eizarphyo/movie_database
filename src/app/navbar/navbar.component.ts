import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from '../service/movie-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  randomMovieID!: number;
  subscriptions: any;

  isLoginPage?: boolean;
  @Output() notifyEvt = new EventEmitter;

  constructor(
    private api: MovieApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkLogin();

  }

  checkLogin(): void {
    // console.log("current route >>", window.location.pathname);
    let pathname = window.location.pathname;
    if (pathname == '/login') {
      this.isLoginPage = true;
    } else {
      this.isLoginPage = false;
    }
  }


  generateRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomMovie() {
    this.randomMovieID = this.generateRandomInt(1, 999999);
    this.checkMovieAvailability();
    console.log("Checking...");
  }

  checkMovieAvailability() {
    this.subscriptions = this.api.getMovieDetail(this.randomMovieID).subscribe({
      next: (resopnse: any) => {
        console.log("Movie found. ID >>", this.randomMovieID);
        this.router.navigateByUrl('movie/' + this.randomMovieID);
        this.notifyEvt.emit(this.randomMovieID);
      }, error: (err: any) => {
        let error = err.status;
        if (error == 404 || error == "404") {
          this.getRandomMovie();
          console.log("not a valaid id");
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieDataService } from '../service/movie-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  allMovies: any = this.dataService.all_movies;
  randomBatch?: number;
  randomMovieIdIndex?: number;
  randomMovieID?: number;

  isLoginPage?: boolean;
  @Output() notifyEvt = new EventEmitter;

  constructor(
    private dataService: MovieDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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


  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateRandomMovie() {
    this.randomBatch = this.getRandomInt(0, 4);
    this.randomMovieIdIndex = this.getRandomInt(0, 19);
    console.log("random movie index >.", this.randomMovieIdIndex);

    this.randomMovieID = this.allMovies[this.randomBatch].movies[this.randomMovieIdIndex]['id'];
    console.log("Movie id >>", this.randomMovieID);
    this.router.navigateByUrl(this.randomBatch + "/" + this.randomMovieID);

    this.notifyEvt.emit(this.randomBatch + "/" + this.randomMovieID);
  }





}

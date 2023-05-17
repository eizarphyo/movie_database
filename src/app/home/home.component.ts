import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from '../service/movie-api.service';
import { SubSink } from 'subsink';
import { MovieResponse, Result } from '../interfaces/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private api: MovieApiService,

  ) { }
  private subs = new SubSink()

  allMovies: any;
  nowPlaying!: Result[];
  popular!: Result[];
  topRated!: Result[];
  upcoming!: Result[];

  loading?: boolean;

  errorMessage?: string;

  movieBatchTitle?: string;
  moviesbatchSubtitle?: string;

  isFav?: boolean;
  heartClass: string = 'heart-o';

  ngOnInit() {
    this.loading = true;
    this.subscribeMovies();

  }

  subscribeMovies() {
    console.log(this.loading);
    this.subs.sink = this.api.getNowPlayingMovies().subscribe((response: MovieResponse) => {
      this.nowPlaying = response.results!;
      this.assignMovies();
      console.log(this.loading);
    });


    this.subs.sink = this.api.getPopularMovies().subscribe((response: any) => {
      this.popular = response.results;
      this.assignMovies();
      console.log(this.loading);
    });


    this.subs.sink = this.api.getTopRatedMovies().subscribe((response: any) => {
      this.topRated = response.results;
      this.assignMovies();
      console.log(this.loading);
    });

    this.subs.sink = this.api.getUpcomingMovies().subscribe((response: any) => {
      this.upcoming = response.results;
      this.assignMovies();
      console.log(this.loading);

    });


  }

  assignMovies() {
    console.log("set TRUE", this.loading);
    this.loading = true;

    this.allMovies = [
      {
        "movies": this.nowPlaying,
        "batchName": "Now Playing Movies",
        "subtitle": "Movies playing in theaters"
      },
      {
        "movies": this.popular,
        "batchName": "Popular Movies",
        "subtitle": "Movies popular with everyone"
      },
      {
        "movies": this.topRated,
        "batchName": "Top Rated Movies",
        "subtitle": "Movies with a good rating"
      },
      {
        "movies": this.upcoming,
        "batchName": "Upcoming Movies",
        "subtitle": "Movies that are soon to be theatered"
      }
    ]
    console.log("allMovie in home >>>>", this.allMovies);

    this.loading = false;
    console.log("set FALSE", this.loading);
  }

  checkErrors(error: any) {
    error = error.status;
    if (error == 404 || error == "404") {
      this.errorMessage = "404 NOT FOUND";
    } else if (error == 401 || error == "401") {
      this.errorMessage = "401 UNAUTHORIZED";
    }
  }

  goTo(movieID: number) {
    this.router.navigateByUrl("movie/" + movieID);
  }

  addFav() {
    if (!this.isFav) {
      this.heartClass = 'heart';
    } else {
      this.heartClass = 'heart-o';
    }
    this.isFav = !this.isFav;
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
    console.log("unsubscribed movies.");

  }

}

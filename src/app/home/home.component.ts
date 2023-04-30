import { Component } from '@angular/core';
import { MovieDataService } from '../service/movie-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private dataService: MovieDataService,
    private router: Router
  ) { }

  allMovies: any;

  movieBatchTitle?: string;
  moviesbatchSubtitle?: string;

  isFav?: boolean;
  heartClass: string = 'heart-o';

  ngOnInit() {
    this.allMovies = this.dataService.all_movies;
    // console.log("all movies >>", this.allMovies);
  }

  goTo(movieID: number, batchIndex: number) {
    this.router.navigateByUrl(batchIndex + "/" + movieID);
  }

  addFav() {
    if (!this.isFav) {
      this.heartClass = 'heart';
    } else {
      this.heartClass = 'heart-o';
    }
    this.isFav = !this.isFav;
  }

}

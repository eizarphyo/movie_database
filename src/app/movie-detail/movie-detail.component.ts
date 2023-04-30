import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { MovieDataService } from '../service/movie-data.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
  allMovies?: any;

  movieID?: string;
  batchIndex?: number;

  routePath?: any;

  heartClass: string = "heart-o";
  isFav?: boolean;

  bookmarkClass: string = "bookmark-o";
  isBookmark?: boolean;

  constructor(
    private dataService: MovieDataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.allMovies = this.dataService.all_movies;
    this.movieID = this.activatedRoute.snapshot.params['id'];
    // console.log('param id >>', this.movieID);

    this.batchIndex = this.activatedRoute.snapshot.params['batchIndex'];
    // console.log('batch index >>', this.batchIndex);
  }

  getMovieBatch(event: any) {
    this.routePath = event;

    console.log("split >>", this.routePath.split('/'));
    let index = this.routePath.split('/')[0];
    this.batchIndex = index;

    let movieId = this.routePath.split('/')[1];
    this.movieID = movieId;
  }


  mouseEnter(iconName: string) {
    if (iconName == 'heart') {
      this.heartClass = "heart";
    } else {
      this.bookmarkClass = "bookmark";
    }
  }

  mouseLeave(iconName: string) {
    if (iconName == 'heart') {
      if (this.heartClass == 'heart' && !this.isFav) {
        this.heartClass = 'heart-o';
      }
    } else {
      if (this.bookmarkClass == 'bookmark' && !this.isBookmark) {
        this.bookmarkClass = 'bookmark-o';
      }
    }
  }

  addFav() {
    if (!this.isFav) {
      this.heartClass = 'heart';
    } else {
      this.heartClass = 'heart-o';
    }
    this.isFav = !this.isFav;
  }

  addBookmark() {
    if (!this.isBookmark) {
      this.bookmarkClass = 'bookmark';
    } else {
      this.bookmarkClass = 'bookmark-o';
    }
    this.isBookmark = !this.isBookmark;
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from '../service/movie-api.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {

  private subs = new SubSink();

  movie: any;
  movieID!: number;

  heartClass: string = "heart-o";
  isFav?: boolean;

  bookmarkClass: string = "bookmark-o";
  isBookmark?: boolean;

  constructor(
    private api: MovieApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscribeMovieDetails();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  subscribeMovieDetails() {
    this.movieID = this.activatedRoute.snapshot.params['id'];
    this.subs.sink = this.api.getMovieDetail(this.movieID).subscribe((response: any) => {
      this.movie = response;
      console.log("RESPONSE", response);
    });
  }

  getMovieBatch(event: any) {
    // this.movieID = event;
    this.subscribeMovieDetails();
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

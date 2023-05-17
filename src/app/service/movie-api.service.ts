import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(
    private http: HttpClient
  ) { }

  now_playing_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=6264e733519659a371b01afc8d0a1c9d&language=en-US&page=1";

  popular_url = "https://api.themoviedb.org/3/movie/popular?api_key=6264e733519659a371b01afc8d0a1c9d&language=en-US&page=1"

  top_rated_url = "https://api.themoviedb.org/3/movie/top_rated?api_key=6264e733519659a371b01afc8d0a1c9d&language=en-US&page=1"

  upcoming_url = "https://api.themoviedb.org/3/movie/upcoming?api_key=6264e733519659a371b01afc8d0a1c9d&language=en-US&page=1"

  movie_id?: number;

  getNowPlayingMovies() {
    return this.http.get(this.now_playing_url);
  }

  getPopularMovies() {
    return this.http.get(this.popular_url);
  }

  getTopRatedMovies() {
    return this.http.get(this.top_rated_url);
  }

  getUpcomingMovies() {
    return this.http.get(this.upcoming_url);
  }

  getMovieDetail(movie_id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=6264e733519659a371b01afc8d0a1c9d`);
  }

  // now_playing_movies: any = [];
  // popular_movies: any = [];
  // top_rated_movies: any = [];
  // upcoming_movies: any = [];
  // all_movies: any = [];

  // assignMovies() {
  //   this.all_movies = [
  //     {
  //       "movies": this.now_playing_movies,
  //       "batchName": "Now Playing Movies",
  //       "subtitle": "Movies playing in theaters"
  //     },
  //     {
  //       "movies": this.popular_movies,
  //       "batchName": "Popular Movies",
  //       "subtitle": "Movies popular with everyone"
  //     },
  //     {
  //       "movies": this.top_rated_movies,
  //       "batchName": "Top Rated Movies",
  //       "subtitle": "Movies with a good rating"
  //     },
  //     {
  //       "movies": this.upcoming_movies,
  //       "batchName": "Upcoming Movies",
  //       "subtitle": "Movies that are soon to be theatered"
  //     }
  //   ]
  //   console.log("all movie data in service >>>>", this.all_movies);
  // }

  // getMovies(): any {
  //   this.http.get(this.now_playing_url).subscribe((response: any) => {
  //     this.now_playing_movies = response.results;
  //     this.assignMovies();
  //   });

  //   this.http.get(this.popular_url).subscribe((response: any) => {
  //     this.popular_movies = response.results;
  //     this.assignMovies();
  //   });


  //   this.http.get(this.top_rated_url).subscribe((response: any) => {
  //     this.top_rated_movies = response.results;
  //     this.assignMovies();
  //   });

  //   this.http.get(this.upcoming_url).subscribe((response: any) => {
  //     this.upcoming_movies = response.results;
  //     this.assignMovies();
  //   });
  //   return this.all_movies;

  // }

}

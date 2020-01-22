import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieRepositoryService } from 'src/app/services/movie-repository.service';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {


  private movieSubcription: Subscription;
  public movies: Movie[] = [];

  constructor(private moviesRepository: MovieRepositoryService,
  ) { }

  ngOnInit() {
    this.movieSubcription = this.moviesRepository.getMoviesAsObservable()
      .subscribe(p => this.movies = p.content);
    this.moviesRepository.refreshPageMovie();
  }

  ngOnDestroy(): void {
    this.movieSubcription.unsubscribe();
  }

}

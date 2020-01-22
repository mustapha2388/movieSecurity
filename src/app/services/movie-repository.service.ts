import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from '../models/page';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieRepositoryService {

  private serviceUrl: string;
  private moviesSubject: BehaviorSubject<Page<Movie>>;
  constructor(private http: HttpClient) {
    this.serviceUrl = `${environment.restapibaseurl}/movies`;
    this.moviesSubject = new BehaviorSubject(Page.emptyPage());
   }

   public getMoviesAsObservable(): Observable<Page<Movie>> {
    return this.moviesSubject.asObservable();
   }

   public refreshPageMovie():void{
     this.http.get<Page<Movie>>(this.serviceUrl)
              .subscribe( p => this.moviesSubject.next(p));
   }
}

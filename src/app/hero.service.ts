import { Injectable } from '@angular/core';
import {HEROES} from './mock-heroes';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {MessageService} from './message.service';
import {Hero} from './hero';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://localhost:8888/heroes';

  constructor(private http: HttpClient,
              private msgService: MessageService) {
    console.log('HeroService constructor');
  }

  private log(message: string){
    this.msgService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]>{
    this.msgService.add('HeroService: fetched heroes');

    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched count: ${heroes.length}`)),
        catchError(this.handleError('getHeroes()', []))
      );
  }

  getHero(id: number): Observable<Hero>{
    this.msgService.add('HeroService: fetched Detail hero ' + id);

    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(() => this.log(`fetched hero id: ${id}`)),
        catchError(this.handleError<Hero>('getHero()'))
      );
  }

  updateHero(hero: Hero): Observable<Hero>{
    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions);
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions);
  }

  deleteHero(hero: Hero | number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.heroesUrl}/${typeof hero === 'number' ? hero : hero.id}`);
  }
}

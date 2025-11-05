import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

const API_URL = "http://localhost:3000/games";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly http: HttpClient = inject(HttpClient);
  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(API_URL);
  }

  addGame(game:Game):Observable<Game>{
    return this.http.post<Game>(API_URL, game);   
  }
  
}

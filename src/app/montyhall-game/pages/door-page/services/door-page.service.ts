import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment as env } from 'src/app/environments/environment';
import {
  addSimulations,
  firstTimeShuffleToGetGoat,
  checkingTheFinalResult,
} from 'src/app/montyhall-game/common/services/MainPage.endpoints';
@Injectable({
  providedIn: 'root',
})
export class DoorPageService {
  constructor(private http: HttpClient) {}

  setSimulations(count: number): Observable<any> {
    return this.http.put<any>(env.apiUrl + addSimulations(count), count);
  }

  checkingTheFinalResult(objArr: any[], goatIdx: number): Observable<any> {
    return this.http.put<any>(
      env.apiUrl + checkingTheFinalResult(goatIdx),
      objArr
    );
  }

  firstTimeShuffleToGetGoat(objArr: any[], idx: number): Observable<any> {
    return this.http.put<any>(
      env.apiUrl + firstTimeShuffleToGetGoat(idx),
      objArr
    );
  }
}

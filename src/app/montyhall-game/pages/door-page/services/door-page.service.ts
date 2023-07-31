import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  setSimulations(count: number) {
    return this.http.post<any>(env.apiUrl + addSimulations(count), count);
  }

  firstTimeShuffleToGetGoat(objArr: any[], idx: number) {
    return this.http.put<any>(
      env.apiUrl + firstTimeShuffleToGetGoat(idx),
      objArr
    );
  }

  checkingTheFinalResult(objArr: any[], goatIdx: number) {
    return this.http.put<any>(
      env.apiUrl + checkingTheFinalResult(goatIdx),
      objArr
    );
  }
}

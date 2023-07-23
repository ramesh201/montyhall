import { Component, Input, inject } from '@angular/core';
import { MainPageService } from '../../services/main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  @Input() noOfDoors: any;
  simulationCount: number = 0;
  simCountAdded: boolean = false;
  doorOpened: boolean = false;
  service = inject(MainPageService);

  green: string = 'btn btn-success';
  red: string = 'btn btn-danger';
  simulationCountNotSet: boolean = true;
  finalResultObj: any = {
    wins: { type: 'Wins', times: 0, percentage: 0 },
    losses: { type: 'Losses', times: 0, percentage: 0 },
    totalRounds: 0,
    isGameOver: false,
  };

  constructor() {}

  GetFinalResultData(data: any) {
    this.finalResultObj = data;
    if (this.finalResultObj.isGameOver) {
      this.finalResultObj.wins.percentage =
        ((this.finalResultObj.totalRounds - this.finalResultObj.losses.times) /
          this.finalResultObj.totalRounds) *
        100;
      this.finalResultObj.losses.percentage =
        ((this.finalResultObj.totalRounds - this.finalResultObj.wins.times) /
          this.finalResultObj.totalRounds) *
        100;

      setTimeout(() => {
        this.setGameOverResultObj();
      }, 2000);
    }
  }
  setGameOverResultObj() {
    this.finalResultObj = {
      wins: { type: 'Wins', times: 0, percentage: 0 },
      losses: { type: 'Losses', times: 0, percentage: 0 },
      totalRounds: 0,
      isGameOver: false,
    };
  }
}

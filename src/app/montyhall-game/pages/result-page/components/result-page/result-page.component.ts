import { Component, Input, OnInit } from '@angular/core';
import { ResultDTO } from '../../models/result-page.model';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
})
export class ResultPageComponent implements OnInit {
  @Input() result: ResultDTO = new ResultDTO();
  @Input() isWin: boolean = false;
  @Input() finalResult: any = {
    wins: { type: 'Wins', times: 0, percentage: 0 },
    losses: { type: 'Losses', times: 0, percentage: 0 },
    totalRounds: 0,
    isGameOver: false,
  };
  resultColor: string = '';
  constructor() {}

  ngOnInit(): void {
    if (this.isWin) this.resultColor = 'btn btn-success w-50';
    else this.resultColor = 'btn btn-danger w-50';
  }
}

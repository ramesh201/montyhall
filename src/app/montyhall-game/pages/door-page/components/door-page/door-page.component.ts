import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { environment as env } from 'src/app/environments/environment';
import { DoorPageService } from '../../services/door-page.service';

@Component({
  selector: 'app-door-page',
  templateUrl: './door-page.component.html',
  styleUrls: ['./door-page.component.scss'],
})
export class DoorPageComponent implements OnInit {
  @Output() finalResult: EventEmitter<any> = new EventEmitter();
  simulationCount!: any | undefined;
  simCountAdded: boolean = false;
  doorOpened: boolean = false;
  service = inject(DoorPageService);
  clickedIndexes: number[] = [];
  goatAppearedIdx: number[] = [];
  actionDone: boolean = false;
  noOfDoors: any[] = this.setDefaultImages();
  totalRounds: number = 0;
  isGameOver: boolean = false;
  revertedFinalResult: boolean = false;

  constructor() {}

  finalResultObj = this.setDefaultFinalResultObj();
  setDefaultImages(): any[] {
    return [
      { id: 0, icon: 'door', imagePath: './assets/images/door.jpeg' },
      { id: 1, icon: 'door', imagePath: './assets/images/door.jpeg' },
      { id: 2, icon: 'door', imagePath: './assets/images/door.jpeg' },
    ];
  }
  setDefaultFinalResultObj(): any {
    return {
      wins: { type: 'Wins', times: 0, percentage: 0 },
      losses: { type: 'Losses', times: 0, percentage: 0 },
      totalRounds: 0,
      isGameOver: false,
    };
  }
  ngOnInit() {}

  shuffle(array: any[]) {
    var arrayLength = array.length,
      temp,
      remainingEleemnt;

    while (arrayLength) {
      // Pick a remaining element…
      remainingEleemnt = Math.floor(Math.random() * arrayLength--);

      // And swap it with the current element.
      temp = array[arrayLength];
      array[arrayLength] = array[remainingEleemnt];
      array[remainingEleemnt] = temp;
    }

    return array;
  }

  async setSimulations(count: any) {
    if (
      (count && count != 0) ||
      (!count && this.actionDone) ||
      typeof count == 'number'
    ) {
      count = !count ? 0 : count;
      if (env.connectedWithAPI) {
        await this.setSimulationFromWebAPI(count);
      } else {
        this.totalRounds = count;
        this.simulationCount = count == 0 ? null : count;
        this.simCountAdded = count == 0 ? false : true;
      }
    } else alert('Enter valid simulation count');
  }
  setSimulationFromWebAPI(count: any) {
    return new Promise<void>((resolve, reject) => {
      this.service.setSimulations(count).subscribe({
        next: (data: any) => {
          this.totalRounds = this.totalRounds == 0 ? data : this.totalRounds;
          this.simulationCount = data == 0 ? null : data;
          this.simCountAdded = data == 0 ? false : true;
          resolve();
        },
        error: (err: any) => {
          alert(
            'Something wrong...Please check your code or WebAPI connection'
          );
          reject(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
  }

  doorOpenAction(door: any = {}, index: number = 0) {
    if (
      (!this.simulationCount && !this.simCountAdded) ||
      (this.simulationCount && !this.simCountAdded)
    ) {
      alert('Enter valid simulation count');
      return;
    }

    if (this.goatAppearedIdx[0] == index) {
      alert("Can't use this door");
      return;
    }

    var doorAction = '';

    if (!this.doorOpened) {
      this.clickedIndexes = [];
      this.goatAppearedIdx = [];
      doorAction = 'init';
      this.clickedIndexes.push(index);
    } else if (this.clickedIndexes[0] == index) doorAction = 'stay';
    else if (this.clickedIndexes[0] != index) doorAction = 'switch';

    switch (doorAction) {
      case 'init':
        if (this.simulationCount != 0) {
          this.doorOpened = true;
          this.firstTimeShuffleToGetGoat(index);
        }
        break;
      case 'stay':
      case 'switch':
        this.simulationCount -= 1;
        this.checkingTheFinalResult(this.goatAppearedIdx[0], index);
        break;
      default:
        break;
    }
  }

  async firstTimeShuffleToGetGoat(index: number) {
    var newShuffled: any[] = [];
    if (env.connectedWithAPI) {
      await this.firstTimeShuffleToGetGoatFromWebAPI(index);
    } else {
      newShuffled = this.shuffle(this.noOfDoors.filter((f) => f.id != index));
      newShuffled[0].imagePath = './assets/images/goat5.jpeg';
      newShuffled[0].icon = 'goat';
      this.goatAppearedIdx.push(newShuffled[0].id);
    }
  }

  firstTimeShuffleToGetGoatFromWebAPI(index: number) {
    var newShuffled: any[] = [];
    return new Promise<void>((resolve, reject) => {
      this.service.firstTimeShuffleToGetGoat(this.noOfDoors, index).subscribe({
        next: (data: any) => {
          if (data.length == 0) {
            this.doorOpened = false;
            alert('Invalid request');
          } else {
            newShuffled = data;
            this.noOfDoors[newShuffled[0].id].imagePath =
              './assets/images/goat5.jpeg';
            this.noOfDoors[newShuffled[0].id].icon = 'goat';
            this.goatAppearedIdx.push(newShuffled[0].id);
          }
          resolve();
        },
        error: (error: any) => {
          alert(error.error.message);
          reject(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
  }

  async checkingTheFinalResult(goatIdx: number, clickedIdx: number) {
    var newShuffled: any[] = [{ id: 0, icon: '', imagePath: '' }];
    if (env.connectedWithAPI) {
      await this.checkingTheFinalResultFromWebAPI(goatIdx);
      if (!this.revertedFinalResult) this.stayOrSwitchActionsRest(clickedIdx);
    } else {
      newShuffled = this.shuffle(this.noOfDoors.filter((f) => f.id != goatIdx));
      newShuffled[0].imagePath = './assets/images/goat5.jpeg';
      newShuffled[0].icon = 'goat';

      newShuffled[newShuffled.length - 1].imagePath =
        './assets/images/car.jpeg';
      newShuffled[newShuffled.length - 1].icon = 'car';
      this.stayOrSwitchActionsRest(clickedIdx);
    }

    return newShuffled;
  }

  checkingTheFinalResultFromWebAPI(index: number) {
    return new Promise<void>((resolve, reject) => {
      this.service.checkingTheFinalResult(this.noOfDoors, index).subscribe({
        next: (data: any) => {
          if (data.length == 0) {
            this.simulationCount += 1;
            this.revertedFinalResult = true;
            alert('Invalid request');
          } else {
            this.revertedFinalResult = false;
            this.noOfDoors = data;
          }
          resolve();
        },
        error: (error: any) => {
          alert(error.error.message);
          reject(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
  }

  stayOrSwitchActionsRest(index: number) {
    if (this.simulationCount == 0 || !this.simulationCount) {
      this.simulationCount = null;
      this.simCountAdded = false;
      this.finalResultObj.isGameOver = true;
    }
    this.actionDone = true;
    this.goatAppearedIdx = [];
    this.setSimulations(this.simulationCount);
    this.doorOpened = false;
    this.actionDone = false;
    var finalResult = this.noOfDoors.filter((f) => f.id == index);
    if (finalResult[0].icon == 'car') {
      alert('you won');
      this.finalResultObj.wins.times += 1;
    } else {
      alert('you lose');
      this.finalResultObj.losses.times += 1;
    }
    this.finalResultObj.totalRounds = this.totalRounds;

    this.finalResult.emit(this.finalResultObj);
    setTimeout(() => {
      this.noOfDoors = this.setDefaultImages();
      if (!this.simulationCount)
        this.finalResultObj = this.setDefaultFinalResultObj();
    }, 1000);
  }
}

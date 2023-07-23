import { IResultDTO } from 'src/app/montyhall-game/common/interfaces/MontyHallDTOs';

export class ResultDTO implements IResultDTO {
  type!: string;
  noOfChances!: number;
  resultPercentage!: number;
}

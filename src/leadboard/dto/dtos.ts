import { IsArray, isEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class createLeadboardDto {
  @IsString()
  gameId: Types.ObjectId;


}

export class updateLeadboardDto {
  @IsString()
  playerId: Types.ObjectId;

  @IsNumber()
  questionIdx: Number;

  @IsNumber()
  playerCorrectAnswers: Number;
}

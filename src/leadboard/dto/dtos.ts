import { IsArray, isEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class createLeadboardDto {
  @IsString()
  gameId: Types.ObjectId;

  @IsArray()
  playerStatsList: [];
}

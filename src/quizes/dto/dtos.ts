import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class Answer {
  @IsNumber()
  idx: number;

  @IsString()
  content: string;

  @IsBoolean()
  isCorrect: boolean;
}

export class Question {
  @IsNumber()
  idx: number;

  @IsString()
  question: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Answer)
  possAnswers: Answer[];
}

export class createQuizDto {
  @IsString()
  @Length(1, 25)
  name: string;

  @IsString()
  @Length(1, 128)
  desc: string;

  @IsString()
  @Length(1, 25)
  authorName: string;

  @IsNumber()
  numOfQuestions: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Question)
  questionList: Question[];
}

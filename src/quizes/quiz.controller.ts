import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { createQuizDto } from './dto/dtos';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async createQuiz(@Body() request: createQuizDto) {
    return this.quizService.createQuiz(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getQuizes() {
    return this.quizService.getQuizes();
  }
}

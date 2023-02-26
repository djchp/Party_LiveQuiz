import { Injectable } from '@nestjs/common';
import { createQuizDto } from './dto/dtos';
import { QuizRepository } from './quiz.repository';
import { Quiz } from './schema/quiz.schema';

@Injectable()
export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}

  async createQuiz(request: createQuizDto) {
    const quiz = await this.quizRepository.create(request);
    return quiz;
  }

  async getQuizes(): Promise<Quiz[]> {
    return this.quizRepository.find({});
  }
}

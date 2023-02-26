import { Injectable } from '@nestjs/common';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { Request } from 'express';
import { Model } from 'mongoose';
import { GameRepository } from 'src/game/game.repository';
import { QuizRepository } from 'src/quizes/quiz.repository';
import { createLeadboardDto } from './dto/dtos';
import { LeadboardRepository } from './leadboard.repository';
import { Leadboard } from './schema/leadboard.schema';

@Injectable()
export class LeadboardService {
  constructor(
    private readonly leadboardRepository: LeadboardRepository,
    protected readonly leadboard: Model<Leadboard>,
    private readonly gameRepository: GameRepository,
    private readonly quizRepository: QuizRepository,
  ) {}

  async createLeadboard(request: Request, leadboardData: createLeadboardDto) {
    const { gameId, playerStatsList } = leadboardData;

    const game = await this.gameRepository.findOne({ _id: gameId });
    const quiz = await this.quizRepository.findOne({ _id: game._id });

    const leadboard = new this.leadboard({ gameId, playerStatsList });

    quiz.questionList.forEach((q) => {
      leadboard.afterQuestionLeadboard.push({
        questionIndex: q.idx,
        leadboardList: [],
      });
    });
    try {
      const createdLeadboard = this.leadboardRepository.create(leadboard);
      return createdLeadboard;
    } catch (error) {}
  }
  async getLeadboard(param: string) {
    try {
      const leadboard = await this.leadboardRepository.findOne({
        _id: param,
      });
      return leadboard;
    } catch (error) {
      throw new NotFoundException();
    }
  }


}

import { Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Model } from 'mongoose';
import { GameService } from 'src/game/game.service';
import { QuizService } from 'src/quizes/quiz.service';
import { createLeadboardDto, updateLeadboardDto } from './dto/dtos';
import { LeadboardRepository } from './leadboard.repository';
import { Leadboard } from './schema/leadboard.schema';

@Injectable()
export class LeadboardService {
  constructor(
    private readonly leadboardRepository: LeadboardRepository,
    private readonly gameSerivce: GameService,
    private readonly quizService: QuizService,
  ) {}

  async createLeadboard(leadboardData: createLeadboardDto) {
    const { gameId } = leadboardData;

    const game = await this.gameSerivce.findOneHelper(gameId);
    const quiz = await this.quizService.findOneHelper(game.quizId);

    const leadboard = await this.leadboardRepository.helperCreate({
      gameId,
    });

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

  async updateLeadboard(param: string, data: updateLeadboardDto) {
    const idx = data.questionIdx;
    const leadboard = await this.leadboardRepository.findOne({ _id: param });
    leadboard.afterQuestionLeadboard[Number(idx) - 1].leadboardList.push({
      playerIds: data.playerId,
      playerCorrectAnswers: data.playerCorrectAnswers,
    });
    const upLeadboard = await this.leadboardRepository.helperCreate(leadboard);

    const retLeadboard = await this.leadboardRepository.upsert(
      { _id: param },
      upLeadboard,
    );
    if (!retLeadboard) {
      throw new InternalServerErrorException();
    }
    return retLeadboard;
  }
}

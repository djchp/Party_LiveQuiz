import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from 'src/game/game.module';
import { GameRepository } from 'src/game/game.repository';
import { GameService } from 'src/game/game.service';
import { QuizModule } from 'src/quizes/quiz.module';
import { QuizService } from 'src/quizes/quiz.service';
import { LeadboardController } from './leadboard.controller';
import { LeadboardRepository } from './leadboard.repository';
import { LeadboardService } from './leadboard.service';
import { Leadboard, LeadboardSchema } from './schema/leadboard.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Leadboard.name, schema: LeadboardSchema },
    ]),
    GameModule,
    QuizModule
  ],
  controllers: [LeadboardController],
  providers: [LeadboardRepository,LeadboardService,GameService,QuizService],
})
export class LeadboardModule {}

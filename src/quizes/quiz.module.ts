import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from './quiz.controller';
import { QuizRepository } from './quiz.repository';
import { QuizService } from './quiz.service';
import { Quiz, QuizSchema } from './schema/quiz.schema';


@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
  ],
  controllers: [QuizController],
  providers: [QuizService, QuizRepository],
  exports: [QuizRepository,QuizService]
})
export class QuizModule {}

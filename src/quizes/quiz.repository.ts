import { Injectable } from '@nestjs/common/decorators';
import { Logger } from '@nestjs/common/services';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/abstract_repo/abstract.repository';
import { Quiz } from './schema/quiz.schema';

@Injectable()
export class QuizRepository extends AbstractRepository<Quiz> {
  protected readonly logger = new Logger(QuizRepository.name);

  constructor(
    @InjectModel(Quiz.name) quizModel: Model<Quiz>,
    @InjectConnection() connection: Connection,
  ) {
    super(quizModel, connection);
  }
}

import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/abstract_repo/abstract.repository';
import { Game } from './schema/game.schema';

export class GameRepository extends AbstractRepository<Game> {
  protected readonly logger = new Logger(GameRepository.name);
  constructor(
    @InjectModel(Game.name) gameModel: Model<Game>,
    @InjectConnection() connection: Connection,
  ) {
    super(gameModel, connection);
  }
}

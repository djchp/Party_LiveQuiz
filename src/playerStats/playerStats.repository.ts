import { AbstractRepository } from '../abstract_repo/abstract.repository';
import { PlayerStats } from './schema/playerStats.schema';
import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

export class PlayerStatsRepostiroy extends AbstractRepository<PlayerStats> {
  protected readonly logger = new Logger();
  constructor(
    @InjectModel(PlayerStats.name) playerStatsModel: Model<PlayerStats>,
    @InjectConnection() connection: Connection,
  ) {
    super(playerStatsModel, connection);
  }
}

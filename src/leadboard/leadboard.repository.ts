import { AbstractRepository } from 'src/abstract_repo/abstract.repository';
import { Leadboard } from './schema/leadboard.schema';
import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

export class LeadboardRepository extends AbstractRepository<Leadboard> {
  protected readonly logger = new Logger();
  constructor(
    @InjectModel(Leadboard.name) leadboardModel: Model<Leadboard>,
    @InjectConnection() connection: Connection,
  ) {
    super(leadboardModel, connection);
  }
}

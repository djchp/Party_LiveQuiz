import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/abstract_repo/abstract.repository';
import { User } from './schema/user.schema';

export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(User.name) userModel: Model<User>,
  ) {
    super(userModel, connection);
  }
}

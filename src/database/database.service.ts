import { Injectable } from '@nestjs/common/decorators';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  dbGetter(): Connection {
    return this.connection;
  }
}

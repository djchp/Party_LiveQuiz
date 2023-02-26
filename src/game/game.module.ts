import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { GameService } from './game.service';
import { Game, GameSchema } from './schema/game.schema';

@Module({
  imports: [ConfigModule,
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),],
  controllers: [GameController],
  providers: [GameService,GameRepository],
})
export class GameModule {}

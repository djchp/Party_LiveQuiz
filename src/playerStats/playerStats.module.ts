import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerStatsController } from './playerStats.controller';
import { PlayerStatsRepostiroy } from './playerStats.repository';
import { PlayerStatsService } from './playerStats.service';
import { PlayerStats, PlayerStatsSchema } from './schema/playerStats.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: PlayerStats.name, schema: PlayerStatsSchema },
    ]),
  ],
  controllers: [PlayerStatsController],
  providers: [PlayerStatsRepostiroy,PlayerStatsService],
})
export class PlyerStatsModule {}

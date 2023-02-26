import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  controllers: [LeadboardController],
  providers: [LeadboardRepository,LeadboardService],
})
export class LeadboardModule {}

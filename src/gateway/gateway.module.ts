import { Module } from '@nestjs/common';
import { GameGateway } from './gateway';

@Module({ imports: [], providers: [GameGateway], exports: [GameGateway] })
export class GatewayModule {}

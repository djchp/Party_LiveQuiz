import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { GameModule } from './game/game.module';
import { GatewayModule } from './gateway/gateway.module';
import { QuizModule } from './quizes/quiz.module';

@Module({
  imports: [
    QuizModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    GameModule,
    GatewayModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

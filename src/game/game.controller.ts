import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { addPLayer, createGameDto } from './dto/dtos';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(@Body() reqBody: createGameDto) {
    return this.gameService.createGame(reqBody);
  }

  @Get()
  async getGames() {
    return this.gameService.getGames();
  }

  @Get(':id')
  async getGame(@Param('id') param: string) {
    return this.gameService.getGame(param);
  }

  @Patch(':id')
  async addPlayer(@Param('id') param: string, @Body() data: addPLayer) {
    return this.gameService.addPlayer(param, data);
  }

  @Patch(':id/endgame')
  async endGame(@Param('id') param: string) {
    return this.gameService.endGame(param);
  }
}

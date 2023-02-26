import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { addPLayer, createGameDto } from './dto/dtos';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}
  //TODO
  //addplayer, update game on new playerStat

  async createGame(request: createGameDto) {
    try {
      const game = await this.gameRepository.create(request);
      return game;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getGame(param: string) {
    try {
      const game = await this.gameRepository.findOne({ _id: param });
      if (!game) {
        throw new NotFoundException('Game not found');
      }
      return game;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async addPlayer(param: string, body: addPLayer) {
    try {
      let game = await this.gameRepository.findOne({ _id: param });
      game.playerList.push({ playerIds: body.playerId });

      const upGame = await this.gameRepository.upsert({ _id: param }, game);
      return upGame;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

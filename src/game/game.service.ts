import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Types } from 'mongoose';
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
      throw new NotFoundException();
    }
  }

  async getGames() {
    const games = await this.gameRepository.find({});
    return games;
  }
  async addPlayer(param: string, body: addPLayer) {
    let game = await this.gameRepository.findOne({ _id: param });
    if (!game) {
      throw new NotFoundException();
    }
    game.playerList.push(body.playerId);

    const upGame = await this.gameRepository.upsert({ _id: param }, game);
    return upGame;
  }

  async endGame(param: string) {
    const game = await this.gameRepository.findOneAndUpdate(
      { _id: param },
      { $set: { isLive: false } },
    );
    if (!game) {
      throw new NotFoundException();
    }
    return game;
  }

  async findOneHelper(id: Types.ObjectId) {
    const game = await this.gameRepository.findOne({ _id: id });
    return game
  }
}

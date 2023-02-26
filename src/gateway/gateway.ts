import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway()
export class GameGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private readonly logger = new Logger(GameGateway.name);

  @WebSocketServer() io: Namespace;

  //todo create decorator to extract identity from ws request
  afterInit(): void {
    this.logger.log('gateway init');
  }
  handleConnection(client: Socket) {
    this.logger.log(`ws client with socketid ${client.id} connected`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`ws client with socketid ${client.id} disconnected`);
  }

  @SubscribeMessage('init-game')
  async init_game(@MessageBody() data, client: Socket) {
    client.join(data.game.pin);
  }

  @SubscribeMessage('add-player')
  async addPlayer(@MessageBody() data, client: Socket) {
    client.join(data.game.pin);
    //emit to other players in room that you joined

    client.to(data.game.pin).emit('player-added', data.name);
  }

  @SubscribeMessage('lockin')
  async startGame(@MessageBody() data, client: Socket) {
    client.to(data.game.pin).emit('game-ready-to-start', data.game.gameId);
  }

  //send signle question each time for security
  @SubscribeMessage('start-questions')
  async startQuestion(@MessageBody() data, client: Socket) {
    client.to(data.game.pin).emit('host-starting-questions', data.question);
  }

  @SubscribeMessage('submit-to-host')
  async sendAnswers(@MessageBody() data, client: Socket) {
    client.to(data.game.pin).emit('result-from-player', data);
  }
}

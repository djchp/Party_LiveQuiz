import { IoAdapter } from '@nestjs/platform-socket.io';
import { Logger, INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerOptions } from 'socket.io';

export class SocketioAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketioAdapter.name);

  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const clport = 3000;
    const cors = {
      origin: 'http://localhost:4000',
    };
    const optionsEdited: ServerOptions = {
      ...options,
      cors,
    };

    return super.createIOServer(port, optionsEdited);
  }
}

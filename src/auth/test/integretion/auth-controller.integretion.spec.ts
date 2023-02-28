import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DatabaseService } from 'src/database/database.service';
import { UserMock } from '../mocks/user.mock';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common/interfaces';
import { createUserDto } from 'src/auth/users/dto/dtos';

describe('AuthController', () => {
  let dbConn: Connection;
  let httpServer: unknown;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConn = moduleRef.get<DatabaseService>(DatabaseService).dbGetter();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await dbConn.collection('users').deleteMany({});
    await app.close();
  });

  describe('register', () => {
    it('should create and user', async () => {
      const createUserReq: createUserDto = {
        email: UserMock().email,
        password: UserMock().password,
        accountType: UserMock().accountType,
        name: UserMock().name,
      };

      const response = await request(httpServer)
        .post('/register')
        .send(createUserReq);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createUserReq);

      const user = await dbConn
        .collection('User')
        .findOne({ email: createUserReq.email });
      expect(user).toMatchObject(createUserReq);
    });
  });
});

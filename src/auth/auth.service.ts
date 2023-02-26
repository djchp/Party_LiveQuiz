import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { createUserDto, logInDto } from './users/dto/dtos';
import { User } from './users/schema/user.schema';
import { UserService } from './users/user.service';

export interface tokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(user: createUserDto) {
    return this.userService.createUser(user);
  }

  public async logIn(user: User, res: Response) {
    const tokenPayload: tokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const at = await this.jwtService.signAsync(tokenPayload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '1h',
    });

    res.cookie('Authentication', at, {
      httpOnly: true,
      expires,
    });
  }
}

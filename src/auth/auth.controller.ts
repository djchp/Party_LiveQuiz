import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LocalAuthGuard } from './guards/local.guard';
import { createUserDto, logInDto } from './users/dto/dtos';
import { User } from './users/schema/user.schema';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class authController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() req: createUserDto) {
    return this.authService.register(req);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.logIn(user, response);
  }

}

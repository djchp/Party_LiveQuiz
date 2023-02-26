import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './schema/user.schema';
import { createUserDto, logInDto } from './dto/dtos';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(req: createUserDto) {
    await this.validateEmail(req);
    const { password, ...rest } = await this.userRepository.create({
      ...req,
      password: await bcrypt.hash(req.password, 10),
    });
    return rest;
  }

  //todo add dto and types
  private async validateEmail(req: createUserDto) {
    let user: User;

    try {
      user = await this.userRepository.findOne({
        email: req.email,
      });
    } catch (error) {}

    if (user) {
      throw new ConflictException('Email already exists');
    }
  }

  async validateUser(cred: logInDto) {
    const { email, password: givenPassword } = cred;
    const user = await this.userRepository.findOne({ email });
    const { password, ...rest } = user;
    if (!user) {
      throw new NotFoundException('user with this email not found');
    }
    const passwordIsValid = await bcrypt.compare(givenPassword, password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Password wrong');
    }
    return rest;
  }

  async getUserByFilter(userArgs: Partial<User>) {
    return this.userRepository.findOne(userArgs);
  }

  async getAllUsers() {
    const users = await this.userRepository.find({});
  }
}

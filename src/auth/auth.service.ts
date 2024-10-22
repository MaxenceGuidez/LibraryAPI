import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserType } from '../users/user.type';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(user: UserType) {
    const userFinded = await this.usersService.findOneByEmail(user.email);
    if (userFinded) {
      throw new BadRequestException(
        `User with email ${user.email} already exists.`,
      );
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(user.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const userSignedUp = {
      email: user.email,
      password: result,
    };
    return await this.usersService.create(userSignedUp);
  }

  async signin(user: UserType) {
    const userFinded = await this.usersService.findOneByEmail(user.email);
    if (!userFinded) {
      throw new NotFoundException(`User with email ${user.email} not found.`);
    }
    const [salt, storedHash] = userFinded.password.split('.');

    const hash = (await scrypt(user.password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return userFinded;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UserType } from './user.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOneById(id: number) {
    if (!id) return null;

    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    if (!email) return null;

    return await this.usersRepository.findOneBy({ email });
  }

  async create(user: UserType) {
    const userCreated = this.usersRepository.create(user);
    await this.usersRepository.save(userCreated);
  }

  async update(id: number, attr: Partial<UserType>) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found.`);
    }
    Object.assign(user, attr);
    await this.usersRepository.save(user);
  }

  async remove(id: number) {
    if (!id) return null;

    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found.`);
    }
    await this.usersRepository.remove(user);
    return `User #${id} removed successfully.`;
  }
}

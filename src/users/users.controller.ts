import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  Serialize,
  SerializeInterceptor,
} from '../common/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/all')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  @Serialize(UserDto)
  @UseInterceptors(new SerializeInterceptor(UserDto))
  async findById(@Param('id') id: number) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found.`);
    }
    return user;
  }

  @Get()
  @Serialize(UserDto)
  async findByEmail(@Query('email') email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    return user;
  }

  @Post('/auth/signup')
  async createUser(@Body() user: CreateUserDto) {
    return await this.authService.signup(user);
  }

  @Post('/auth/signin')
  async verifyUser(@Body() user: CreateUserDto) {
    return await this.authService.signin(user);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() attr: UpdateUserDto) {
    return await this.usersService.update(parseInt(id), attr);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }
}

import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user.dto.ts';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return user;
    } catch(e) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'This is a custom message',
      }, HttpStatus.BAD_REQUEST);
    }
  }
}

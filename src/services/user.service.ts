import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from '../entities/user.entity';               // ajuste o path
import { CreateUserDto } from '../dto/create-user.dto';       // ajuste o path.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const entity = this.users.create(dto as DeepPartial<User>);
    return this.users.save(entity);
  }
}

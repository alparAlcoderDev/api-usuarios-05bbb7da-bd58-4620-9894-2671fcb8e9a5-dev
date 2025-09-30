import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from '../entities/user.entity';        
import { CreateUserDto } from '../dto/user.dto';       

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const entity = this.users.create(dto as DeepPartial<User>);
    return this.users.save(entity);
  }
}

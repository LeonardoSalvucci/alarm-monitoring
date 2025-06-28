import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async updateHashedRefreshToken(id: number, hashedRefreshToken: string) {
    return await this.userRepository.update({ id }, { hashedRefreshToken });
  }

  async validateRefreshToken(id: number, hashedRefreshToken: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['hashedRefreshToken'],
    });
    if (!user || !user.hashedRefreshToken) {
      return false;
    }
    return await verify(user.hashedRefreshToken, hashedRefreshToken);
  }

  async logout(id: number) {
    return await this.userRepository.update(
      { id },
      { hashedRefreshToken: null },
    );
  }
}

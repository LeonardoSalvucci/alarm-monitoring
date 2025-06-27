import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSchema } from '@alarm-monitoring/schemas';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

// Always parse UserSchema to avoid exposing the user password and other sensitive fields
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({
    description: 'User created successfully',
    type: UserDto,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const userCreated = await this.userService.create(createUserDto);
    return UserSchema.parse(userCreated);
  }

  @Get('/all')
  @ApiOkResponse({
    description: 'List of all users',
    type: UserDto,
    isArray: true,
  })
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => UserSchema.parse(user));
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'User found successfully',
    type: UserDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    return UserSchema.parse(user);
  }

  @Patch(':id')
  @HttpCode(204)
  @ApiOkResponse({
    description: 'User updated successfully',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.update(id, updateUserDto);
    return;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOkResponse({
    description: 'User deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.userService.remove(id);
    return;
  }
}

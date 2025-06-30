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
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole, UserSchema } from '@alarm-monitoring/schemas';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

// Always parse UserSchema to avoid exposing the user password and other sensitive fields
@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard) // Protect all user routes with JWT authentication
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

  @Get('/me')
  @ApiOkResponse({
    description: 'Current user found successfully',
    type: UserDto,
  })
  async findMe(@Req() req: Request & { user: { id: number } }) {
    console.log('req.user', req.user);
    const user = await this.userService.findOne(req.user.id);
    return UserSchema.parse(user);
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

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
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

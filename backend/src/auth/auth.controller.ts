import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import type { LoginResponse } from '@alarm-monitoring/schemas/auth';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-respose.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Login successful',
    type: LoginResponseDto,
  })
  login(@Request() req: Request & { user: { id: number } }) {
    const response: LoginResponse = {
      accessToken: this.authService.login(req.user.id),
      type: 'Bearer',
    };
    return response;
  }
}

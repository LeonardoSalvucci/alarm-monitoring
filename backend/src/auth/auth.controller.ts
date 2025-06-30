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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-respose.dto';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

type RequestGuard = Request & {
  user: {
    id: number;
    role: string;
  };
};

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @UseGuards(LocalAuthGuard)
  login(@Request() req: RequestGuard) {
    return this.authService.login(req.user.id, req.user.role);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Refresh token successful',
    type: LoginResponseDto,
  })
  @UseGuards(RefreshAuthGuard)
  refresh(@Request() req: RequestGuard) {
    return this.authService.refreshToken(req.user.id, req.user.role);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Logout successful',
  })
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req: RequestGuard) {
    await this.authService.logout(req.user.id);
    return;
  }
}

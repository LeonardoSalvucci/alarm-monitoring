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
    return this.authService.login(req.user.id);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Refresh token successful',
    type: LoginResponseDto,
  })
  @UseGuards(RefreshAuthGuard)
  refresh(@Request() req: Request & { user: { id: number } }) {
    return this.authService.refreshToken(req.user.id);
  }
}

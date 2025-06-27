import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import type { JwtPayload } from '@alarm-monitoring/schemas/auth'; // Adjust the import path as necessary

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    return { id: user.id };
  }

  login(userId: number): string {
    const payload: JwtPayload = { sub: userId };
    return this.jwtService.sign(payload as object);
  }
}

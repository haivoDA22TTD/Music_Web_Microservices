import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy token từ header Authorization Bearer
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'my_super_secret_jwt_key_1234567890',
    });
  }

  async validate(payload: any) {
    // Payload chính là dữ liệu được giải mã từ token (sub, roles, ...)
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}

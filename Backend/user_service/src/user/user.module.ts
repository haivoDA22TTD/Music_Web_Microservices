// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 cần dòng này!
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Nếu service này dùng ở module khác
})
export class UserModule {}

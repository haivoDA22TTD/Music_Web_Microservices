import {
  Controller,
  Patch,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('me/avatar')
  @UseGuards(AuthGuard('jwt')) // Bảo vệ route bằng JWT
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Thư mục lưu file, nhớ tạo thư mục này trước nhé
        filename: (req, file, cb) => {
          // Tạo tên file duy nhất, giữ phần mở rộng file
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `avatar-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn dung lượng 2MB
      fileFilter: (req, file, cb) => {
        // Chỉ cho phép upload file ảnh jpg, jpeg, png
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new BadRequestException('Chỉ cho phép file ảnh JPG, JPEG, PNG!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req) {
    try {
      const userId = req.user?.userId; // Lấy userId từ payload JWT (cần đúng tên trường validate trả về)

      if (!userId) {
        throw new BadRequestException('Người dùng chưa xác thực');
      }

      if (!file) {
        throw new BadRequestException('Không có file được upload');
      }

      // Đường dẫn avatar trả về client để frontend hiển thị
      const avatarUrl = `/uploads/${file.filename}`;

      // Cập nhật url avatar vào database user
      await this.userService.updateAvatar(userId, avatarUrl);

      return { avatarUrl };
    } catch (error) {
      // Bắt lỗi và trả về lỗi 500 nếu có vấn đề
      throw new InternalServerErrorException(error.message || 'Lỗi upload avatar');
    }
  }
}

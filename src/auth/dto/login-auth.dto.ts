import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @ApiProperty({
    example: 'admin',
    description: '用户名',
  })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;
}

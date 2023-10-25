import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({
    example: {
      access_token: '',
      id: 1,
      username: '',
      password: '',
      salt: '',
      create_time: '',
      update_time: '',
    },
  })
  data: string;
  @ApiProperty({ example: '请求成功' })
  message: string;
  @ApiProperty({ example: true })
  success: boolean;
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from '@/public/public.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { LoginResponse } from './vo/auth.vo';

@ApiTags('登录验证模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @ApiOkResponse({ description: '登录成功返回', type: LoginResponse })
  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'token',
  })
  @Post('test')
  test() {
    return 'test';
  }
}

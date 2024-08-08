
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('用户登录')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @ApiOperation({ summary: '用户登录' })
    @ApiBody({ type: Object })
    @ApiResponse({ status: 200, description: '成功返回token。' })
    @Post('login')
    async login(@Body() body) {
        console.log(body);
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            return { msg: '操作失败', code: 401 };
          }
          return this.authService.login(user);
    }

    // logout
    @ApiOperation({ summary: '用户登出' })
    @Post('logout')
    async logout(@Body() body) {
        console.log(body);
        return { msg: '操作成功', code: 200 };
    }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { SignUpBodyDto } from './dto/signUp.dto';
import { CookieService } from './cookie.service';
import { Response } from 'express';
import { AuthGuard } from '../common/quards/auth.quard';
import { SignInBodyDto } from './dto/signIn.dto';
import { GetSessionInfoDto } from './dto/session.dto';
import { SessionInfo } from 'src/common/decorators/session.decorator';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  async signUp(
    @Body() body: SignUpBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signUp(
      body.name,
      body.email,
      body.password,
    );

    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-in')
  @ApiCreatedResponse()
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: SignInBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signIn(
      body.email,
      body.password,
    );

    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-out')
  @ApiCreatedResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Post('session')
  @ApiCreatedResponse({
    type: GetSessionInfoDto,
  })
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
}

import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, response, Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from './dto/login.dto';
import { CreateUserDto } from './dto/user-signup.dto';
import { User } from './schema/user.schema';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  //Register a new User
  @Post('/register')
  signup(@Body() createUserDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.createUser(createUserDto);
  }

  //Login User
  @Post('/login')
  async login(@Res({ passthrough:true}) response: Response, @Req() request: Request, @Body() loginUserDto: LoginUserDto):Promise<{ token: string }>  {

    response.cookie('token', (await this.authService.loginUser(loginUserDto)).token, {
      httpOnly: true,
      expires: new Date(Date.now() + (1000 * 60 * 60 * 24) * 3)
    })
    // response.json({ csrfToken: request.csrfToken()});
    return this.authService.loginUser(loginUserDto);
    
  }

  //logout User
  @Get('/logout')
  async logout(@Res() response: Response) {
    try {
      response.clearCookie("token")
      return response.json({message: "Signout successful"});
    } catch (error) {
      console.log(error);
    }
  }
}

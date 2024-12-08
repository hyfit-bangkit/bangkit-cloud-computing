import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDTO } from 'src/dto/register.dto';
import { LoginDTO } from 'src/dto/login.dto';

@Controller('/api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    return {
      status: 'success',
      message: 'User registered successfully',
      data: user,
    };
  }

  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.login(loginDTO);
    return {
      status: 'success',
      message: 'User login successfuly',
      data: user,
    };
  }
}

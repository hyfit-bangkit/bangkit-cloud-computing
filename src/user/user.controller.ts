import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDTO } from 'src/dto/register.dto';
import { LoginDTO } from 'src/dto/login.dto';
import { UpdateProfileDTO } from 'src/dto/update-profile.dto';

@Controller('/api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @HttpCode(201)
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

  @Get('/profile')
  async getUser(@Headers('Authorization') authHeader: string): Promise<any> {
    const profile = await this.userService.user(authHeader);
    return {
      status: 'success',
      message: 'User found!',
      data: profile,
    };
  }

  @Patch('/profile')
  async updateUser(
    @Headers('Authorization') authHeader: string,
    @Body() updateProfileDTO: UpdateProfileDTO,
  ): Promise<any> {
    const updatedProfile = await this.userService.editUser(
      authHeader,
      updateProfileDTO,
    );

    return {
      status: 'success',
      message: 'Profile updated successfully',
      data: updatedProfile,
    };
  }

  @Delete('/profile')
  @HttpCode(204)
  async deleteUser(
    @Headers('Authorization') authHeader: string,
  ): Promise<void> {
    await this.userService.deleteUser(authHeader);
  }
}

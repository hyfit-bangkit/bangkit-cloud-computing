import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from 'src/dto/register.dto';
import { JwtAuthService } from 'src/jwt/jwt.service';
import { LoginDTO } from 'src/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(registerDTO: RegisterDTO): Promise<User> {
    const {
      email,
      username,
      password,
      full_name,
      height,
      weight,
      avatar_url,
      bio,
      date_of_birth,
      gender,
    } = registerDTO;

    const existingUserByUsername = await this.findOneByUsername(username);
    const existingUserByEmail = await this.findOneByEmail(email);

    if (existingUserByUsername) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
    if (existingUserByEmail) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email: email.toLowerCase().trim(),
      username: username.toLowerCase().trim(),
      full_name: full_name || null,
      height: height,
      weight: weight,
      avatar_url: avatar_url,
      bio: bio,
      password: hashedPassword,
      date_of_birth: date_of_birth,
      gender: gender,
      is_active: true,
      created_at: new Date(),
    });

    return this.userRepository.save(user);
  }

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const { username, password } = loginDTO;

    const user = await this.findOneByUsername(username);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = await this.jwtAuthService.generateToken(user);
    return { accessToken };
  }

  async validateTokenAndGetUser(authHeader: string): Promise<User> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Token is required', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    const payload = await this.jwtAuthService.validateToken(token);

    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async user(authHeader: string): Promise<any> {
    const user = await this.validateTokenAndGetUser(authHeader);

    const currentYear = new Date().getFullYear();
    const birthYear = user.date_of_birth
      ? new Date(user.date_of_birth).getFullYear()
      : null;
    const age = birthYear ? currentYear - birthYear : null;

    return {
      full_name: user.full_name,
      bio: user.bio,
      height: user.height,
      weight: user.weight,
      age: age,
    };
  }

  async editUser(authHeader: string, updateData: any): Promise<any> {
    const user = await this.validateTokenAndGetUser(authHeader);

    const updatedUser = Object.assign(user, updateData);
    await this.userRepository.save(updatedUser);

    return {
      full_name: updatedUser.full_name,
      avatar_url: updatedUser.avatar_url,
      bio: updatedUser.bio,
      weight: updatedUser.weight,
      height: updatedUser.height,
      date_of_birth: updatedUser.date_of_birth,
      gender: updatedUser.gender,
    };
  }

  async deleteUser(authHeader: string): Promise<void> {
    const user = await this.validateTokenAndGetUser(authHeader);
    await this.userRepository.delete(user.id);
  }
}

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.user_password)) {
      const { user_password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.user_email, loginDto.user_password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      email: user.user_email, 
      sub: user._id,
      role: user.user_role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.user_email,
        role: user.user_role
      }
    };
  }

  async register(registerDto: RegisterDto) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersService.findByEmail(registerDto.user_email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Créer le nouvel utilisateur
    const user = await this.usersService.create({
      ...registerDto,
      user_preferences: {
        notifications: {
          email: false,
          webhook: '',
          apiKey: ''
        },
        categories: []
      }
    });

    // Générer le token
    const payload = { 
      email: user.user_email, 
      sub: user._id,
      role: user.user_role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.user_email,
        role: user.user_role
      }
    };
  }

  async refreshToken(userId: string) {
    const user = await this.usersService.findOne(userId);
    const payload = { 
      email: user.user_email, 
      sub: user._id,
      role: user.user_role 
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
} 
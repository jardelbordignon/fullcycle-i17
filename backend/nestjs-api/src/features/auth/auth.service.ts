import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

const users = [
  {
    email: 'john@email.com',
    id: 'user-1',
    password: 'john',
  },
  {
    email: 'joe@email.com',
    id: 'user-2',
    password: 'joe',
  },
  {
    email: 'jessie@email.com',
    id: 'user-3',
    password: 'jessie',
  },
]

export type LoginDto = {
  email: string
  password: string
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(data: LoginDto) {
    const user = users.find(
      user => user.email === data.email && user.password === data.password
    )

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { email: user.email, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}

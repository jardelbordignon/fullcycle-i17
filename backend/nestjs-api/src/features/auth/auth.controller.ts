import { Body, Controller, Post } from '@nestjs/common'

import { UseZodValidation, z, zodObject } from 'src/infra/pipes/zod-validation.pipe'

import { AuthService, LoginDto } from './auth.service'

const loginZodObject = zodObject<LoginDto>({
  email: z.string().email(),
  password: z.string(),
})

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseZodValidation(loginZodObject)
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }
}

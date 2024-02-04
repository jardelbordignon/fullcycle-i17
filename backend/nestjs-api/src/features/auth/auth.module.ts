import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

@Global()
@Module({
  controllers: [AuthController],
  exports: [AuthGuard],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '5min' },
    }),
  ],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || []
    return type === 'Bearer' ? token : undefined
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const token = this.extractToken(request)

    if (!token) {
      throw new UnauthorizedException('Missing access token')
    }

    try {
      const payload = this.jwtService.verify(token)
      request['user'] = payload
      return true
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}

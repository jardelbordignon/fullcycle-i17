import { ExecutionContext, createParamDecorator } from '@nestjs/common'

//import type { UserPayload } from './jwt.strategy'

export const CurrentUser = createParamDecorator(
  (
    data: any, // keyof UserPayload,
    ctx: ExecutionContext
  ) => {
    const { user } = ctx.switchToHttp().getRequest<{ user }>()
    return data ? user?.[data] : user
  }
)

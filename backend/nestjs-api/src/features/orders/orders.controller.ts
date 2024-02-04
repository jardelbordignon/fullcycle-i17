import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Request } from 'express'

import { UseZodValidation, z, zodObject } from 'src/infra/pipes/zod-validation.pipe'

import { AuthGuard } from '../auth/auth.guard'

import { OrderCreateDto, OrdersService } from './orders.service'

const orderCreateZodObject = zodObject<OrderCreateDto>({
  card_hash: z.string(),
  items: z.array(
    z.object({
      product_id: z.string(),
      quantity: z.number(),
    })
  ),
})

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private service: OrdersService) {}

  @UseZodValidation(orderCreateZodObject)
  @Post()
  create(@Body() body: OrderCreateDto, @Req() req: Request) {
    return this.service.create(req['user'].sub, body)
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.service.findAll(req['user'].sub)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.service.findOne(id, req['user'].sub)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() body: Prisma.OrderUpdateInput
  ) {
    return this.service.update(id, req['user'].sub, body)
  }
}

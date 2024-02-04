import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { UseZodValidation, z, zodObject } from 'src/infra/pipes/zod-validation.pipe'

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

@Controller('orders')
export class OrdersController {
  constructor(private service: OrdersService) {}

  @UseZodValidation(orderCreateZodObject)
  @Post()
  create(@Body() body: OrderCreateDto) {
    return this.service.create('client-uuid', body)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Prisma.OrderUpdateInput) {
    return this.service.update(id, body)
  }
}

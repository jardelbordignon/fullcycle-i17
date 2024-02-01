import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Post()
  create(@Body() body: Prisma.ProductCreateInput) {
    return this.service.create(body)
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
  update(@Param('id') id: string, @Body() body: Prisma.ProductUpdateInput) {
    return this.service.update(id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}

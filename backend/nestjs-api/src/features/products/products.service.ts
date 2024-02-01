import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from 'src/infra/providers/prisma/prisma.service'

@Injectable()
export class ProductsService extends PrismaService {
  create(data: Prisma.ProductCreateInput) {
    return this.product.create({ data })
  }

  findAll() {
    return this.product.findMany()
  }

  findOne(id: string) {
    return this.product.findUnique({ where: { id } })
  }

  update(id: string, data: Prisma.ProductUpdateInput) {
    return this.product.update({ data, where: { id } })
  }

  remove(id: string) {
    return this.product.delete({ where: { id } })
  }
}

import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from 'src/infra/providers/prisma/prisma.service'

type OrderItemDto = {
  quantity: number
  product_id: string
}

export type OrderCreateDto = {
  card_hash: string
  items: OrderItemDto[]
}

@Injectable()
export class OrdersService extends PrismaService {
  async create(client_id: string, dto: OrderCreateDto) {
    let total = 0
    const orderItemsWithPriceData: Prisma.OrderItemCreateManyOrderInput[] = []

    for (const { product_id, quantity } of dto.items) {
      const product = await this.product.findUnique({ where: { id: product_id } })
      if (!product) throw new Error(`Não existe um produto com o id ${product_id}`)

      total += product.price * quantity
      orderItemsWithPriceData.push({ price: product.price, product_id, quantity })
    }

    const data: Prisma.OrderCreateInput = {
      client_id,
      items: { createMany: { data: orderItemsWithPriceData } },
      total,
    }

    return this.order.create({ data })
  }

  findAll(client_id: string) {
    return this.order.findMany({ orderBy: { created_at: 'desc' }, where: { client_id } })
  }

  findOne(id: string, client_id: string) {
    return this.order.findUnique({ where: { client_id, id } })
  }

  update(id: string, client_id: string, data: Prisma.OrderUpdateInput) {
    return this.order.update({ data, where: { client_id, id } })
  }
}

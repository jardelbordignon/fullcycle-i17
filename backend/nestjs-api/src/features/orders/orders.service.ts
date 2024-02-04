import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
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

type OrderCreatedQueueData = {
  card_hash: string
  client_id: string
  order_id: string
  total: number
}

@Injectable()
export class OrdersService extends PrismaService {
  constructor(private amqpConn: AmqpConnection) {
    super()
  }

  async create(client_id: string, dto: OrderCreateDto) {
    try {
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

      const order = await this.order.create({ data })

      const orderCreatedQueueData: OrderCreatedQueueData = {
        card_hash: dto.card_hash,
        client_id,
        order_id: order.id,
        total,
      }

      this.amqpConn.publish('amq.direct', 'order.created', orderCreatedQueueData)

      return order
    } catch (error: any) {
      throw new Error(`Erro ao criar o pedido: ${error?.message}`)
    }
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

import { faker } from '@faker-js/faker'
import { NestFactory } from '@nestjs/core'
import { OrderStatus, Prisma } from '@prisma/client'

import { PrismaService } from 'src/infra/providers/prisma/prisma.service'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)

  try {
    const prismaService = app.get(PrismaService)

    const orders = await prismaService.order.findMany()
    if (orders.length) {
      for (const { id } of orders) {
        await prismaService.order.delete({ where: { id } })
      }
    }

    let products = await prismaService.product.findMany()
    if (products.length) {
      for (const { id } of products) {
        await prismaService.product.delete({ where: { id } })
      }
    }

    const length = Math.floor(Math.random() * 20) + 30 // 30 to 50

    const data: Prisma.ProductCreateInput[] = Array.from({ length }).map(() => ({
      description: faker.commerce.productDescription(),
      image_url: faker.image.url(),
      name: faker.commerce.productName(),
      price: faker.number.float({ max: 300, min: 10, multipleOf: 0.02 }), //faker.commerce.price({ dec: 2 }),
    }))

    await prismaService.product.createMany({ data })

    products = await prismaService.product.findMany()

    Array.from({ length: Math.floor(Math.random() * 20) + 30 }).forEach(async () => {
      const length = Math.floor(Math.random() * 4) + 1 // 1 to 4
      const items = Array.from({ length }).map(() => {
        const product = products[Math.floor(Math.random() * products.length)]
        return {
          price: product.price,
          product_id: product.id,
          quantity: Math.floor(Math.random() * 4) + 1,
        }
      })

      await prismaService.order.create({
        data: {
          client_id: faker.string.uuid(),
          items: { createMany: { data: items } },
          status: faker.helpers.enumValue(OrderStatus),
          total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        },
      })
    })
  } catch (error) {
    console.error(error)
  } finally {
    await app.close()
  }
}
bootstrap()

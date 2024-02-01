import { faker } from '@faker-js/faker'
import { NestFactory } from '@nestjs/core'

import { PrismaService } from 'src/infra/providers/prisma/prisma.service'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)

  try {
    const prismaService = app.get(PrismaService)

    await prismaService.product.deleteMany()

    const data = Array.from({ length: 50 }).map(() => ({
      description: faker.commerce.productDescription(),
      image_url: faker.image.url(),
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
    }))

    await prismaService.product.createMany({ data })
  } finally {
    await app.close()
  }
}
bootstrap()

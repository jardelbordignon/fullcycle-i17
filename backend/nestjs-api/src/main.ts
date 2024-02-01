import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('Bootstrap')

  const port = process.env.PORT || 4000

  await app
    .listen(port)
    .then(async () => {
      logger.log(`🚀 Server is running at: ${await app.getUrl()}`)
    })
    .catch(error => logger.error(`❌ Server starts error: ${error}`))
}
bootstrap()

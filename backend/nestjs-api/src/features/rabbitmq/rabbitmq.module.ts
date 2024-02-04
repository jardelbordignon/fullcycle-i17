import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  exports: [RabbitMQModule],
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBITMQ_URL!,
    }),
  ],
})
export class RabbitmqModule {}

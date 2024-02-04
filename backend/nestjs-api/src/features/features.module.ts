import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule, RabbitmqModule],
})
export class FeaturesModule {}

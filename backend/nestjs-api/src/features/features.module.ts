import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule],
})
export class FeaturesModule {}

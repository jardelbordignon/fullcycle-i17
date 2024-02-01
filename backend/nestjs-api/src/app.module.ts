import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { FeaturesModule } from './features/features.module'
import { InfraModule } from './infra/infra.module'

@Module({
  controllers: [AppController],
  imports: [InfraModule, FeaturesModule],
  providers: [],
})
export class AppModule {}

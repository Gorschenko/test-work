import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `envs/gateway/.${process.env.NODE_ENV}.env`,
    }),
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}

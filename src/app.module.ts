import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todo2',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
      // @Module({
      //   imports: [TypeOrmModule.forRoot(), TodoModule],
      //   controllers: [AppController],
      //   providers: [AppService],
      // })
      // export class AppModule {}
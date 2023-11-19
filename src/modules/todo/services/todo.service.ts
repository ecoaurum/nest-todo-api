import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class TodoService extends TypeOrmCrudService<Todo>{
  constructor(@InjectRepository(Todo) todoRepository) {
    super(todoRepository);
  };

  // findAll(): Promise<Todo[]> {
  //   return this.todoRepository.find();
  // };

  // findOne(id: number): Promise<Todo | null> {
  //   return this.todoRepository.findOneBy({ id });
  // };

  // create(todo: Todo): Promise<Todo> {
  //   delete todo.id;
  //   return this.todoRepository.save(todo);
  // };

  // update(todo: Todo): Promise<Todo> {       
  //   return this.todoRepository.save(todo);
  // };

  // async remove(id: number): Promise<void> {
  //   await this.todoRepository.delete(id);
  // };
};
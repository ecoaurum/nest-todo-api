import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {};

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  };

  findOne(id: number): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id });
  };

  create(todo: Todo): Promise<Todo> {
    delete todo.id;
    return this.todoRepository.save(todo);
  };

  // async update(todo: Todo): Promise<Todo> {
  //   const loadedTodo = await this.todoRepository.findOneById(todo.id);
  //   loadedTodo.title = todo.title;
  //   loadedTodo.isCompleted = todo.isCompleted;
  //   return this.todoRepository.save(loadedTodo);
  // };

  update(todo: Todo): Promise<Todo> {       
    return this.todoRepository.save(todo);
  };

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  };
};
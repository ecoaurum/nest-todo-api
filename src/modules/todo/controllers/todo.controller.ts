import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto';
import { TodoService } from '../services/todo.service';
import { Todo } from '../entities/todo.entity';

//GetOne
//GetMany
//Post (Create or Update)
//Delete (Delete)

@Controller('rest/todo')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllAction(): Promise<Todo[]> {
    return this.todoService.findAll();
  };

  @Get(':id')
  async getOneAction(@Param('id') id: number): Promise<Todo> {
    const todo = this.todoService.findOne(id);
    if (todo === undefined) {
      throw new HttpException('Todo with id = ' + id + 'not exist', HttpStatus.NOT_FOUND);
      // throw new NotFoundException('Todo with id = ' + id + 'not exist');
    }
    return todo;
  };

  //Create
  @Post()
  createAction(@Body() createDto: CreateDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createDto.title;
    if (createDto.isCompleted !== undefined) {
      todo.isCompleted = createDto.isCompleted;
    }
    return this.todoService.create(todo);
  };

  // //Update
  // @Put(':id')
  // updateAction(
  //   @Param('id') id: string, 
  //   @Body() todo: UpdateDto
  //   ): UpdateDto {
  //   console.log('Search by id', id);    
  //   console.log(todo, 'saved');    
  //   return todo;
  // };

   //Update
   @Put(':id')
   async updateAction(
     @Param('id') id: number, 
     @Body() {title, isCompleted = false}: UpdateDto
     ): Promise<Todo | { error: boolean}> { 
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException('Todo with id = ' + id + 'not exist');
    }
    todo.title = title;
    todo.isCompleted = isCompleted;
    return this.todoService.update(todo);
   };

  //Delete
  @Delete(':id')
  deleteAction(@Param('id') id: number): Promise<void> {
    return this.todoService.remove(id);
  };
}

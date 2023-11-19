import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto';
import { TodoService } from '../services/todo.service';
import { Todo } from '../entities/todo.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundResponse } from './type';

//GetOne
//GetMany
//Post (Create or Update)
//Delete (Delete)

@ApiTags('todo')
@Controller('rest/todo')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiResponse({ 
    status: 200, 
    description: 'Get all todos',
    type: [Todo]
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found',
    type: NotFoundResponse
  })
  getAllAction(): Promise<Todo[]> {
    return this.todoService.findAll();
  };

  @Get(':id')
  @ApiResponse({ 
    status: 200, 
    description: 'Get todo by id',
    type: Todo,
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found',
    type: NotFoundResponse
  })
  async getOneAction(@Param('id') id: number): Promise<Todo> {
    const todo = await this.todoService.findOne(id);   
    if (todo === undefined) {     
      throw new HttpException('Todo with id = ' + id + 'not exist', HttpStatus.NOT_FOUND);
    }
    return todo;
  };

  //Create
  @Post()
  @ApiResponse({ 
    status: 200, 
    description: 'Create todo',
    type: Todo,
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found',
    type: NotFoundResponse
  })
  @ApiBody({ type: CreateDto})
  createAction(@Body() createDto: CreateDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createDto.title;
    if (createDto.isCompleted !== undefined) {
      todo.isCompleted = createDto.isCompleted;
    }
    return this.todoService.create(todo);
  };

  // //Update



   //Update
   @Put(':id')
   @ApiResponse({ 
    status: 200, 
    description: 'Update todo',
    type: Todo,
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found',
    type: NotFoundResponse
  })
   @ApiBody({ type: UpdateDto})
   async updateAction(
     @Param('id') id: number, 
     @Body() {title, isCompleted = false}: UpdateDto
     ): Promise<Todo | { error: boolean}> { 
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException('Todo with id = ' + id + 'not exist');
    };
    todo.title = title;
    todo.isCompleted = isCompleted;
    return this.todoService.update(todo);
   };

  //Delete
  @Delete(':id')
  @ApiResponse({ 
    status: 200, 
    description: 'Delete todo',
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found',
    type: NotFoundResponse
  })
  async deleteAction(@Param('id') id: number): Promise<{success: boolean}> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException('Todo with id = ' + id + 'not exist');
    };
    await  this.todoService.remove(id);
    return {
      success: true
    }
  };
}

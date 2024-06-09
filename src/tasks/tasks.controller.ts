import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreatetaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // create a task
  @Post()
  createTask(@Body() createtaskDto: CreatetaskDto): Task {
    return this.tasksService.createTask(createtaskDto);
  }
}

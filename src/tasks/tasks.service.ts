import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreatetaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // get all tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // get tasks with filters
  getTasksWithFilters(filterDto: any): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // do something with search
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  // get task by id
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  // create a task
  createTask(createTaskDto: CreatetaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  // update the status of a task
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = TaskStatus[status];
    console.log('🚀 ~ TasksService ~ updateTaskStatus ~ status:', status);
    return task;
  }

  // delete a task
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

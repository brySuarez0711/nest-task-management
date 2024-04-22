import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // get all tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // create a task
  createTask(title: string, description: string): Task {
    const task: Task = {
      id: Math.random().toString(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    return task;
  }
}

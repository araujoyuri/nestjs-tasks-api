import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  public getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  public async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);

    if (!task) {
      throw new NotFoundException({
        message: 'Task not found',
        field: 'task.id',
        value: id,
      });
    }

    return task;
  }

  public createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  public async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected < 1) {
      throw new NotFoundException({
        message: 'Task not found',
        field: 'task.id',
        value: id,
      });
    }
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}

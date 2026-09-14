import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        console.log('Tasks received from backend:', data);
        this.tasks = data;
      },
      error: (error) => {
        console.error('API ERROR:', error);
      }
    });
  }
}



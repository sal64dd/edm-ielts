import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-list-box',
  templateUrl: './task-list-box.component.html',
  styles: [
  ]
})
export class TaskListBoxComponent implements OnInit {

  constructor(public tasks: TaskService) {

   }

  ngOnInit(): void {
  }

}

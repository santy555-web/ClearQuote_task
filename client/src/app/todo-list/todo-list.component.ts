import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: any;
  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.getTodos()
  }

  getTodos() {
    this.todoService.getTodos(data => {
      this.todos = data.todos;

    })
  }

  deleteTodo(id) {
    this.todoService.deleteTodo(id, (data) => {
      if (data.status) {
        this.getTodos()
        alert('Todo deleted successfully');
      }
    });
  }

  updateTodo(todo){

  }
}

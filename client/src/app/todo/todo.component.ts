import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  id: any;
  name:any;
  gmail:any;
  empaddress:any;
  error: any;
  constructor(public todoService: TodoService, public router: Router) { }

  ngOnInit() {
  }

  addEmp() {
    this.error = '';
 //   console.log(this.id, this.name);
    if (this.id && this.name && this.gmail && this.empaddress) {
      var todo = {
        id: this.id,
        name:this.name,
        gmail:this.gmail,
        empaddress:this.empaddress
      }
      this.todoService.createTodo(todo, (data) => {
        if (data.status) {
          this.id= '';
          this.empaddress= '';
          this.name= '';
          this.gmail= '';
          this.router.navigateByUrl("/home/todo-list");
        }
      });
    } else {
      this.error = "All fields required!!!";
    }

  }

}

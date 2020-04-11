import { Component, OnInit } from '@angular/core';
//importing 'todo.service.ts' file to get array data from it
import { TodoService } from '../../services/todo.service';

import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    //getting array data from 'todo.service.ts' file
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  //deleting a todo item
  deleteTodo(todo:Todo){
    //remove from ui
    //returning all t's that t.id not equal to todo.id 
    this.todos = this.todos.filter(t => t.id !== todo.id);

    //remove from server 
    this.todoService.deleteTodo(todo).subscribe;
  }

  addTodo(todo:Todo){
    //'addTodo()' function is from 'todo.service.ts' file
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }


}

//For the 'onDelete' function we import 'EventEmitter, Output'
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { splitClasses } from '@angular/compiler';

//importing 'todo.service.ts' file
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;

  //For the 'onDelete()' function we are doing this
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter(); 

  //injecting imported 'TodoService'
  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  //Set dynamic classes
  setClasses(){
    let classes = {
      todo: true,

      //'is-complete' property is in the css file
      //this will cross the word by a line
      'is-complete': this.todo.completed
    }
    return classes;
  }

  //implementing 'onToggle' event
  onToggle(todo){
    //toggle in UI
    todo.completed = !todo.completed

    //toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo =>
      console.log(todo));
  }

  //implementing 'onDelete' event
  onDelete(todo){
    this.deleteTodo.emit(todo)
  }
}

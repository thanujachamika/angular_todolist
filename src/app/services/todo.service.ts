import { Injectable } from '@angular/core';

//importing 'HttpClient' and 'HttpHeaders'
import { HttpClient, HttpHeaders } from '@angular/common/http';

//importing 'Todo' model 
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

//for usage of the 'togleCompleted()' nethod
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  //in order to use imported 'HttpClient' and 'HttpHeaders' we have to inject it to
  //the constructor
  constructor(private http:HttpClient) { }

  //url that we are fetching data
  //limiting the results that we are getting
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';

  //get todos
  getTodos():Observable<Todo[]>{
    //getting data as 'Todo' models from 'todosurl'
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  //toggle completed
  toggleCompleted(todo:Todo):Observable<any>{
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  //delete Todo
  deleteTodo(todo:Todo):Observable<Todo>{
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  //add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}

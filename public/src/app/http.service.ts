import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient){}

  getUsers(){
    console.log('users')
    return this._http.get('/users');
  }

  postUsers(){
    console.log('post 2')
    return this._http.post('/users', {'name': 'my name is raza', 'age': 24});
  }
}

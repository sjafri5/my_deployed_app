import { Injectable, Input } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient){}

  getPets(){
    return this._http.get('/getPets');
  }

  postUsers(){
    console.log('post 2')
    return this._http.post('/users', {'name': 'my name is raza', 'age': 24});
  }
}

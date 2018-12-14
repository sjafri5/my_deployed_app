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

  getPet(petId){
    return this._http.get('/getPet/' + petId);
  }

  editPet(petObj){
   console.log('editservice', petObj)
    return this._http.post('/editPet', petObj);
  }

  createPet(petObj){
    return this._http.post('/createPet', petObj);
  }

  postUsers(){
    return this._http.post('/users', {'name': 'my name is raza', 'age': 24});
  }
}

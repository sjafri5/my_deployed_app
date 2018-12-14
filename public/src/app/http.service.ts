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

  like(petId){
   console.log('abx')
   return this._http.post('/like', {id: petId});
  }

  editPet(petObj){
    return this._http.post('/editPet', petObj);
  }

  deletePet(petId){
   console.log('deleteService', petId)
   return this._http.delete('/deletePet/' + petId);
  }

  createPet(petObj){
    return this._http.post('/createPet', petObj);
  }

  postUsers(){
    return this._http.post('/users', {'name': 'my name is raza', 'age': 24});
  }
}

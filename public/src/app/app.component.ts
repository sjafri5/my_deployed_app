import { Component, OnInit } from '@angular/core';
import { HttpService  } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ze Pet Store';

  constructor(private _httpService: HttpService){}
  ngOnInit(){
    this.pets= []
    this.getPets()
  }

  postUsers(){
    let observable = this._httpService.postUsers();
    observable.subscribe(data => {
      console.log('potdata', data)
      this.getUsers();
    })
  }

  getPets(){
    let observable = this._httpService.getPets();
    observable.subscribe(data => {
      console.log('petssssll', data)
      this.pets = data['data']
    })
  }
}

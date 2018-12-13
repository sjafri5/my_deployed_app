import { Component, OnInit } from '@angular/core';
import { HttpService  } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'rapid deployment';
  users: any;

  constructor(private _httpService: HttpService){}
  ngOnInit(){
    this.users = []
    this.postUsers()
  }

  postUsers(){
   console.log('posstt')
    let observable = this._httpService.postUsers();
    observable.subscribe(data => {
      console.log('potdata', data)
      this.getUsers();
    })
  }

  getUsers(){
    let observable = this._httpService.getUsers();
    observable.subscribe(data => {
      console.log('data', data)
      this.users = data['data']
    })
  }
}

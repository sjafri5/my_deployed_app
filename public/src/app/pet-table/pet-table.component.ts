import { Component, OnInit, Input } from '@angular/core';
import { HttpService  } from '../http.service';

@Component({
  selector: 'app-pet-table',
  templateUrl: './pet-table.component.html',
  styleUrls: ['./pet-table.component.css']
})
export class PetTableComponent implements OnInit {
  pets: any;

  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.pets= []
    this.getPets()
  }

  getPets(){
    let observable = this._httpService.getPets();
    observable.subscribe(data => {
      console.log('petssssll', data)
      this.pets = data['data']
    })
  }

}

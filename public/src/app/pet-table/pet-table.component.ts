import { Component, OnInit, Input } from '@angular/core';
import sortBy from 'lodash/sortBy'
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
    const _this = this
    observable.subscribe(data => {
      _this.organizePets(data['data'])
    })
  }

  organizePets(pets){
  console.log('org')
    this.pets = sortBy(pets, 'type');
  }

}

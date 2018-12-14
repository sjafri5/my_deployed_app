import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  pet: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
     this._route.parent.params.subscribe(params => {
      console.log('params', params)
      this.getPet(params.id)
   });
  }

  getPet(petId){
    let observable = this._httpService.getPet(petId);
    observable.subscribe(data => {
     console.log('data', data)
     this.pet = data['data']
    })
  }

  onEdit() {
   console.log('edit method', this.pet)
   let observable = this._httpService.editPet(this.pet);
   observable.subscribe(data => {
   console.log('posted new pet', data)
     this.pet= { name: "", description: "", skills: ""  }
   })
  }
}

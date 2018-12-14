import { Component, OnInit } from '@angular/core';
import map from 'lodash/map';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  pet: any;
  errors: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router 
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
   let observable = this._httpService.editPet(this.pet);
   let _this = this;
   observable.subscribe(data => {
      if(data['message'] === 'error') {
        _this.buildErrorMessages(data.data.errors)
      }
      else {
        this._router.navigate(['/pets', this.pet._id]);
        this.pet= { name: "", description: "", skills: ""  }
      }
   })
  }

  buildErrorMessages(errors) {
    this.errors = map(errors, (val, key) => {
      
      let msg;
      if (val.kind === 'unique'){
        msg = key + 'value must be unique'
      }
      if (val.kind === 'minlength'){
        msg = key + ': value must be at least 3 characters'
      }
      return msg;
    })
    console.log(this.errors)
  }

  cancel(){
    this._router.navigate(['/pets', this.pet._id]);
  }
}

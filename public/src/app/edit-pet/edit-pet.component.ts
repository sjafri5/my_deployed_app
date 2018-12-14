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
     const petObj = data['data'];
     this.pet = petObj
     this.pet.skill1 =  petObj.skills[0]
     this.pet.skill2 =  petObj.skills[1]
     this.pet.skill3 =  petObj.skills[2]
    })
  }

  onEdit() {
   this.error = undefined
   let observable = this._httpService.editPet(this.pet);
   let _this = this;
   observable.subscribe(data => {
      if(data['message'] === 'error') {
        console.log('myerr', data.data)
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
        msg = 'name: must be unique'
      }
      if (val.kind === 'user defined'){
        msg = key + ': no more than three skills allowed'
      }
      if (val.kind === 'minlength'){
        msg = key + ': must be at least 3 characters'
      }
      return msg;
    })
  }

  cancel(){
    this._router.navigate(['/pets', this.pet._id]);
  }
}

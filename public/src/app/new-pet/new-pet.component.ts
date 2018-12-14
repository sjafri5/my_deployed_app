import { Component, OnInit } from '@angular/core';
import map from 'lodash/map';
import { HttpService  } from '../http.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})
export class NewPetComponent implements OnInit {
  newPet: any;
  errors: any;

  constructor(
    private _httpService: HttpService,
    private _router: Router 
  ) { }

  ngOnInit() {
    this.newPet= { name: "", type: "", description: "", skill1: "", skill2:"", skill3: ""  }
  }

  onSubmit() {
    let _this = this
    let observable = this._httpService.createPet(this.newPet);
    observable
    .subscribe(data => {
      if(data['message'] === 'error') {
        console.log('err', data)
        _this.buildErrorMessages(data.data.errors)
      }
      else {
        this._router.navigate(['/']);
        this.newPet= { name: "", description: "", skills: ""  }
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
    this._router.navigate(['/']);
  }
}

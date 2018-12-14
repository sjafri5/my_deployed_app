import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';

@Component({
  selector: 'app-show-pet',
  templateUrl: './show-pet.component.html',
  styleUrls: ['./show-pet.component.css']
})
export class ShowPetComponent implements OnInit {
  public pet;

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
     this.pet = data['data']
    })
  }

  delete(petId){
    console.log('delete')
    let observable = this._httpService.deletePet(this.pet._id);
    observable.subscribe(data => {
      this._router.navigate(['/']);
    })
  }
}

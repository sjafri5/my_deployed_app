import { Component, OnInit } from '@angular/core';
import { HttpService  } from '../http.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})
export class NewPetComponent implements OnInit {
  newPet: any;
  constructor(
    private _httpService: HttpService,
    private _router: Router 
  ) { }

  ngOnInit() {
    this.newPet= { name: "", description: "", skills: ""  }
  }

  onSubmit() {
    let observable = this._httpService.createPet(this.newPet);
    observable.subscribe(data => {
      this._router.navigate(['/']);
      this.newPet= { name: "", description: "", skills: ""  }
    })
  }

  cancel(){
    this._router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpService  } from '../http.service';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})
export class NewPetComponent implements OnInit {
  newPet: any;
  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.newPet= { name: "", description: "", skills: ""  }
  }

  onSubmit() {
    let observable = this._httpService.createPet(this.newPet);
    observable.subscribe(data => {
     console.log('posted new pet', data)
      this.newPet= { name: "", description: "", skills: ""  }
    })
  }
}

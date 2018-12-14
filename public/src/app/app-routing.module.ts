import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPetComponent  } from './new-pet/new-pet.component';
import { PetTableComponent  } from './pet-table/pet-table.component';
import { PetDetailsComponent  } from './pet-details/pet-details.component';
import { ShowPetComponent  } from './show-pet/show-pet.component';
import { EditPetComponent  } from './edit-pet/edit-pet.component';

//const routes: Routes = [];
const routes: Routes = [
  { path: 'pets', component: PetTableComponent  },
  { path: '', pathMatch: 'full', redirectTo: '/pets' },
  { path: 'pets/new', component: NewPetComponent  },
  { path: 'pets/:id', component: PetDetailsComponent , children: [
    { path: '', component: ShowPetComponent },
    { path: 'edit', component: EditPetComponent }
    ]
    }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

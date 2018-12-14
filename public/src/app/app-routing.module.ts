import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPetComponent  } from './new-pet/new-pet.component';
import { PetTableComponent  } from './pet-table/pet-table.component';
import { PetDetailsComponent  } from './pet-details/pet-details.component';

const routes: Routes = [];
const routes: Routes = [
  { path: 'pets', component: PetTableComponent  },
  { path: '', pathMatch: 'full', redirectTo: '/pets' },
  { path: 'pets/:id', component: PetDetailsComponent },
  { path: 'pets/new', component: NewPetComponent  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

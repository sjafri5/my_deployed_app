import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService  } from './http.service';
import { HttpClientModule  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetTableComponent } from './pet-table/pet-table.component';
import { NewPetComponent } from './new-pet/new-pet.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { ShowPetComponent } from './show-pet/show-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';

@NgModule({
  declarations: [
    AppComponent,
    PetTableComponent,
    NewPetComponent,
    PetDetailsComponent,
    ShowPetComponent,
    EditPetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

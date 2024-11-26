import { Routes } from '@angular/router';
import { CrewCardComponent } from './crew-card/crew-card.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
 // { path: '', component: AppComponent }, // Ana sayfa
  { path: 'crew-card/:id', component: CrewCardComponent }, // Tayfa detay sayfası
];

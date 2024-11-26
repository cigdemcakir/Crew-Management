import { Routes } from '@angular/router';
import { CrewCardComponent } from './crew-card/crew-card.component';
import { CertificateTypeCreateComponent } from './certificate-type-create/certificate-type-create.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
 // { path: '', component: AppComponent }, // Anasayfa
  { path: 'crew-card/:id', component: CrewCardComponent },
  { path: 'add-certificate-type', component: CertificateTypeCreateComponent },
];

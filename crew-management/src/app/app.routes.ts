import { Routes } from '@angular/router';
import { CrewCardComponent } from './crew/crew-card/crew-card.component';
import { CertificateTypeCreateComponent } from './certificate/certificate-type-create/certificate-type-create.component';
import {AboutpageComponent} from './aboutpage/aboutpage/aboutpage.component';
import {ContactpageComponent} from './contactpage/contactpage/contactpage.component';

export const routes: Routes = [
 // { path: '', component: AppComponent }, // Anasayfa
  { path: 'crew-card/:id', component: CrewCardComponent },
  { path: 'add-certificate-type', component: CertificateTypeCreateComponent },
  { path: 'about', component: AboutpageComponent },
  { path: 'contact', component: ContactpageComponent },
];

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// Crew veri yapısını tanımlıyoruz
interface Crew {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crew-management';

  // Örnek Crew verileri
  crewList: Crew[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', title: 'Captain' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', title: 'Engineer' },
    { id: 3, firstName: 'Sam', lastName: 'Brown', title: 'Cook' },
    { id: 4, firstName: 'Emily', lastName: 'Johnson', title: 'Mechanic' },
    { id: 5, firstName: 'Michael', lastName: 'Lee', title: 'Navigator' },
  ];

  // Tablo için kullanılacak sütunlar
  displayedColumns: string[] = ['firstName', 'lastName', 'title', 'actions'];


  constructor(private translate: TranslateService) {
    // Set the default language
    this.translate.setDefaultLang('en');
    this.translate.use('en'); // Initialize with English
  }
  debugEvent(event: Event): void {
    console.log(event);
    const value = (event.target as HTMLSelectElement)?.value;
    this.switchLanguage((value as string) || null);
    console.log(`Selected value: ${value}`);
  }

  switchLanguage(language: string | null): void {
    if (language) {
      this.translate.use(language);
      console.log(`Language switched to: ${language}`);
    } else {
      console.error('Invalid language selection');
    }
  }



  // Düzenleme ve silme fonksiyonları
  editCrew(crew: Crew) {
    console.log('Editing crew:', crew);
  }

  deleteCrew(id: number) {
    this.crewList = this.crewList.filter((crew) => crew.id !== id);
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}

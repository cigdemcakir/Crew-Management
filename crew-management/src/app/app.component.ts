import { Component } from '@angular/core';
import {RouterOutlet, Routes} from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditCrewDialogComponent } from './edit-crew-dialog/edit-crew-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

interface Crew {
  id: number; // Benzersiz ID
  firstName: string; // Tayfanın adı
  lastName: string; // Tayfanın soyadı
  title: string; // Görevi
  nationality: string;
  dailyRate: number; // Günlük çalışma ücreti
  currency: string; // Ücretin para birimi
  daysOnBoard: number; // Gemide çalıştığı gün sayısı
  totalIncome: number; // Toplam kazanç (dailyRate * daysOnBoard)
  certificates?: Certificate[]; // Opsiyonel olarak tayfanın sertifikaları
}

interface Certificate {
  id: number; // Sertifika ID
  type: string; // Sertifika türü
  issueDate: Date; // Sertifikanın veriliş tarihi
  expiryDate: Date; // Sertifikanın geçerlilik son tarihi
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
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule, // Form işlevselliği için gerekli
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'crew-management';

  // Örnek Crew verileri
  crewList: Crew[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      title: 'Captain',
      nationality: 'USA',
      dailyRate: 150,
      currency: 'USD',
      daysOnBoard: 30,
      totalIncome: 4500, // 150 * 30
      certificates: [
        { id: 1, type: 'Safety Training', issueDate: new Date('2023-01-01'), expiryDate: new Date('2025-01-01') }
      ]
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      title: 'Engineer',
      nationality: 'UK',
      dailyRate: 130,
      currency: 'EUR',
      daysOnBoard: 25,
      totalIncome: 3250, // 130 * 25
      certificates: [
        { id: 2, type: 'Engine Maintenance', issueDate: new Date('2022-06-15'), expiryDate: new Date('2024-06-15') }
      ]
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      title: 'Cooker',
      nationality: 'Spain',
      dailyRate: 100,
      currency: 'USD',
      daysOnBoard: 20,
      totalIncome: 2000, // 100 * 20
      certificates: [
        { id: 3, type: 'Food Hygiene', issueDate: new Date('2021-12-01'), expiryDate: new Date('2023-12-01') }
      ]
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Brown',
      title: 'Mechanic',
      nationality: 'Canada',
      dailyRate: 120,
      currency: 'USD',
      daysOnBoard: 28,
      totalIncome: 3360, // 120 * 28
      certificates: [
        { id: 4, type: 'Mechanic Certification', issueDate: new Date('2022-08-01'), expiryDate: new Date('2024-08-01') }
      ]
    },
    {
      id: 5,
      firstName: 'Robert',
      lastName: 'Williams',
      title: 'Deckhand',
      nationality:'India',
      dailyRate: 80,
      currency: 'EUR',
      daysOnBoard: 15,
      totalIncome: 1200, // 80 * 15
      certificates: [
        { id: 5, type: 'Basic Seamanship', issueDate: new Date('2020-05-10'), expiryDate: new Date('2023-05-10') }
      ]
    },
    {
      id: 6,
      firstName: 'Robert',
      lastName: 'Williams',
      title: 'Deckhand',
      nationality:'India',
      dailyRate: 80,
      currency: 'EUR',
      daysOnBoard: 15,
      totalIncome: 1200, // 80 * 15
      certificates: [
        { id: 5, type: 'Basic Seamanship', issueDate: new Date('2020-05-10'), expiryDate: new Date('2023-05-10') }
      ]
    }
  ];


  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'nationality',
    'daysOnBoard',
    'dailyRate',
    'currency',
    'totalIncome',
    'certificates',
    'actions'
  ];

  constructor(private dialog: MatDialog, private translate: TranslateService) {
    // Varsayılan dili ayarlayın
    this.translate.setDefaultLang('en');
    this.translate.use('en'); // İngilizce ile başlat
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

  deleteCrew(id: number): void {
    const confirmation = confirm('Are you sure you want to delete this crew member?');
    if (confirmation) {
      this.crewList = this.crewList.filter((crew) => crew.id !== id);
    }
  }

  openEditDialog(crew: Crew): void {
    const dialogRef = this.dialog.open(EditCrewDialogComponent, {
      width: '400px',
      data: { ...crew } // Seçilen satırdaki veriyi popup'a gönderiyoruz
    });

    dialogRef.afterClosed().subscribe((updatedCrew) => {
      if (updatedCrew) {
        console.log('Updated Crew:', updatedCrew); // Dönen veriyi kontrol edin

        // Listeyi güncelle
        const index = this.crewList.findIndex((c) => c.id === updatedCrew.id);
        if (index !== -1) {
          this.crewList[index] = updatedCrew; // Listeyi güncelle
          this.crewList = [...this.crewList]; // Angular değişikliği algılaması için referansı değiştirin
        } else {
          console.error('Crew not found in the list!');
        }
      } else {
        console.log('No changes made.');
      }
    });
  }











  protected readonly HTMLSelectElement = HTMLSelectElement;
}

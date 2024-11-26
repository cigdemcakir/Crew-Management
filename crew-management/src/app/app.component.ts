import { Component } from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import { RouterModule } from '@angular/router'; 
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
import { AddCrewDialogComponent } from './add-crew-dialog/add-crew-dialog.component';
import { CrewService } from './services/crew.service';


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
  discount?: number; // Yeni Discount Alanı
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
    MatInputModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'crew-management';
  isHomeRoute: boolean = true; 
  objectKeys = Object.keys; 
  crewList: Crew[] = []; // Tayfa listesi

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'nationality',
    'daysOnBoard',
    'dailyRate',
    'currency',
    'discount', 
    'totalIncome',
    'certificates',
    'actions'
  ];

  constructor(private router: Router,private crewService: CrewService,private dialog: MatDialog, private translate: TranslateService) {
    // Varsayılan dili ayarlayın
    this.router.events.subscribe(() => {
      this.isHomeRoute = this.router.url === '/';
    });
    this.translate.setDefaultLang('en');
    this.translate.use('en'); // İngilizce ile başlat
    this.loadCrewList(); // Tayfa listesini yükle
   
  }

  loadCrewList(): void {
    this.crewList = this.crewService.getCrewList();
    this.updateTotalIncomeSummary(); // Toplam özeti güncelle
  }

  debugEvent(event: Event): void {
    console.log(event);
    const value = (event.target as HTMLSelectElement)?.value;
    this.switchLanguage((value as string) || null);
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
       this.crewService.deleteCrew(id); // Servis üzerinden sil
       this.loadCrewList(); // Listeyi yeniden yükle
    }
  }

  openEditDialog(crew: Crew): void {
    const dialogRef = this.dialog.open(EditCrewDialogComponent, {
      width: '90vw',
      maxWidth: 'none', // Maksimum genişlik sınırlamasını kaldırır
      height: 'auto', // Yükseklik içeriğe göre dinamik olur
      maxHeight: '90vh',
      data: { ...crew } // Seçilen satırdaki veriyi popup'a gönderiyoruz
    });

    dialogRef.afterClosed().subscribe((updatedCrew) => {
      if (updatedCrew) {
        this.crewService.updateCrew(updatedCrew); // Servis üzerinden güncelle
        this.loadCrewList(); // Listeyi yeniden yükle
      }
    });
  }
  openAddCrewDialog(): void {
    const dialogRef = this.dialog.open(AddCrewDialogComponent, {
      width: '90vw',
      maxWidth: 'none', // Maksimum genişlik sınırlamasını kaldırır
      height: 'auto', // Yükseklik içeriğe göre dinamik olur
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((newCrew) => {
      if (newCrew) {
        this.crewService.addCrew(newCrew); // Servis üzerinden ekle
        this.loadCrewList(); // Listeyi yeniden yükle
      }
    });
  }
  totalIncomeSummary: { [currency: string]: number } = {};
  // Satır bazında güncellenmiş toplamı hesaplar
  updateCrewList(): void {
    this.crewList = [...this.crewList]; // Referansı değiştirmek için listeyi kopyala
  }

  applyDiscount(crew: Crew): void {
    const discount = crew.discount || 0;
    crew.totalIncome = (crew.dailyRate * crew.daysOnBoard) - discount; // Satır toplamını hesapla
    this.crewService.updateCrew(crew); // Servis üzerinden güncelle
    this.updateTotalIncomeSummary();
  }
  // Tüm verilerin toplamını günceller
  updateTotalIncomeSummary(): void {
    const summary: { [currency: string]: number } = {};

    this.crewList.forEach((crew) => {
      if (!summary[crew.currency]) {
        summary[crew.currency] = 0;
      }
      summary[crew.currency] += crew.totalIncome;
    });

    this.totalIncomeSummary = summary;
  }

  // Satırdaki discount güncellendiğinde çağrılır
  updateTotalIncome(crew: Crew): void {
    this.updateTotalIncomeSummary(); // Toplam özeti güncelle
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}

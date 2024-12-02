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
import { EditCrewDialogComponent } from './crew/edit-crew-dialog/edit-crew-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AddCrewDialogComponent } from './crew/add-crew-dialog/add-crew-dialog.component';
import { CrewService } from './services/crew.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import { FormGroup, FormControl } from '@angular/forms';

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
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatSlideToggleModule,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'crew-management';
  isHomeRoute: boolean = true;
  objectKeys = Object.keys;
  crewList: Crew[] = []; // Tayfa listesi
  isDarkMode: boolean = false;
  filteredCrewList: any[] = []; // Filtrelenmiş liste

  titles: string[] = ['Captain', 'Engineer', 'Mechanic', 'Deckhand']; // Görev listesi
  nationalities: string[] = ['USA', 'UK', 'India', 'Canada']; // Milliyetler
  
  filterForm = new FormGroup({
    search: new FormControl(''),
    title: new FormControl(''),
    nationality: new FormControl(''),
  });

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'title',
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
    this.translate.use('en'); 
    this.loadCrewList();

  }
  ngOnInit() {
    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }
  applyFilters() {
    const { search, title, nationality } = this.filterForm.value;

    this.filteredCrewList = this.crewList.filter((crew) => {
      const matchesSearch =
        !search ||
        crew.firstName.toLowerCase().includes(search.toLowerCase()) ||
        crew.lastName.toLowerCase().includes(search.toLowerCase());
      const matchesTitle = !title || crew.title === title;
      const matchesNationality = !nationality || crew.nationality === nationality;

      return matchesSearch && matchesTitle && matchesNationality;
    });
  }
  loadCrewList(): void {
    this.crewList = this.crewService.getCrewList();
    this.filteredCrewList = [...this.crewList];
    this.updateTotalIncomeSummary(); // Toplam özeti güncelle
  }

  debugEvent(event: Event): void {
    const value = (event.target as HTMLSelectElement)?.value;
    this.switchLanguage((value as string) || null);
  }

  switchLanguage(language: string | null): void {
    if (language) {
      this.translate.use(language);
    } else {
      console.error('Invalid language selection');
    }
  }

  deleteCrew(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Crew Member',
        message: 'Are you sure you want to delete this crew member? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.crewService.deleteCrew(id); 
        this.loadCrewList(); 
      }
    });
  }


  openEditDialog(crew: Crew): void {
    const dialogRef = this.dialog.open(EditCrewDialogComponent, {
      width: '90vw',
      maxWidth: 'none', 
      height: 'auto', 
      maxHeight: '90vh',
      data: { ...crew }
    });

    dialogRef.afterClosed().subscribe((updatedCrew) => {
      if (updatedCrew) {
        this.crewService.updateCrew(updatedCrew); 
        this.loadCrewList(); 
      }
    });
  }
  openAddCrewDialog(): void {
    const dialogRef = this.dialog.open(AddCrewDialogComponent, {
      width: '90vw',
      maxWidth: 'none', 
      height: 'auto',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((newCrew) => {
      if (newCrew) {
        this.crewService.addCrew(newCrew); 
        this.loadCrewList(); 
      }
    });
  }
  totalIncomeSummary: { [currency: string]: number } = {};
  updateCrewList(): void {
    this.crewList = [...this.crewList]; 
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

  updateTotalIncome(crew: Crew): void {
    this.updateTotalIncomeSummary(); // Toplam özeti güncelle
  }
  toggleTheme(isChecked: boolean): void {
    this.isDarkMode = isChecked;

    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }
  resetFilters(): void {
    this.filterForm.reset({
      search: '',
      title: '',
      nationality: ''
    });
    this.filteredCrewList = [...this.crewList]; 
  }
  
  protected readonly HTMLSelectElement = HTMLSelectElement;
}

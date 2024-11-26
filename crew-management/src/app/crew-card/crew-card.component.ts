import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CrewService } from '../services/crew.service';
import { Crew as CrewModel } from '../services/crew.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // MatIconModule'u ekleyin
import { MatButtonModule } from '@angular/material/button'; // Butonlar için gerekli
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-crew-card',
  imports: [
    CommonModule,
    MatTabsModule,
    TranslateModule, 
    MatCardModule,
    MatTableModule,
    MatIconModule, // Buraya ekleyin
    MatButtonModule, // Butonlar için ekleyin
  ],
  templateUrl: './crew-card.component.html',
  styleUrls: ['./crew-card.component.css']
})
export class CrewCardComponent implements OnInit {
  crew: CrewModel | undefined; // Tayfa verisi

  selectedTabIndex = 0; 

  constructor(
    private route: ActivatedRoute, // Route parametrelerini okumak için
    private router: Router, // Geri navigasyon için
    private crewService: CrewService // Veriyi almak için
  ) {}

  ngOnInit(): void {
    
    // Route parametresinden ID'yi al ve tayfa verisini yükle
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.crew = this.crewService.getCrewById(+id); // Servisten tayfa bilgisi al
    }
    // Query parametrelerini oku ve tabı belirle
    this.route.queryParamMap.subscribe((params) => {
      const tab = params.get('tab');
      if (tab === 'certificates') {
        this.selectedTabIndex = 1; // Certificates tabını seç
      } else {
        this.selectedTabIndex = 0; // Default olarak Card tabını seç
      }
    });
  }
  // Kullanıcı tab değiştirdiğinde URL'yi güncelle
  onTabChange(event: MatTabChangeEvent): void {
    const tab = event.index === 1 ? 'certificates' : 'card';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge',
    });
  }
  
  goBack(): void {
    // Ana sayfaya geri dön
    this.router.navigate(['/']);
  }
}
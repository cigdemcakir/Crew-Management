import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CrewService } from '../services/crew.service';
import { Crew as CrewModel } from '../services/crew.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crew-card',
  imports: [
    CommonModule,
    MatTabsModule,
    TranslateModule, // TranslateModule burada ekli olmalı
  ],
  templateUrl: './crew-card.component.html',
  styleUrls: ['./crew-card.component.css']
})
export class CrewCardComponent implements OnInit {
  crew: CrewModel | undefined; // Tayfa verisi

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
  }

  goBack(): void {
    // Ana sayfaya geri dön
    this.router.navigate(['/']);
  }
}
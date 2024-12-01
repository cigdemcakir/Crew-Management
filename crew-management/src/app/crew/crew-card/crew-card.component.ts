import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CrewService } from '../../services/crew.service';
import { Crew as CrewModel } from '../../services/crew.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-crew-card',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    TranslateModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './crew-card.component.html',
  styleUrls: ['./crew-card.component.css']
})

export class CrewCardComponent implements OnInit {
  crew: CrewModel | undefined;

  selectedTabIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crewService: CrewService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.crew = this.crewService.getCrewById(+id);
    }
    this.route.queryParamMap.subscribe((params) => {
      const tab = params.get('tab');
      if (tab === 'certificates') {
        this.selectedTabIndex = 1;
      } else {
        this.selectedTabIndex = 0;
      }
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    const tab = event.index === 1 ? 'certificates' : 'card';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge',
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [RouterOutlet, MatTableModule, MatButtonModule, MatIconModule],
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

  // Düzenleme ve silme fonksiyonları
  editCrew(crew: Crew) {
    console.log('Editing crew:', crew);
  }

  deleteCrew(id: number) {
    this.crewList = this.crewList.filter((crew) => crew.id !== id);
  }
}


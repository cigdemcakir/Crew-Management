import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-crew-dialog',
  standalone: true,
  templateUrl: './add-crew-dialog.component.html',
  styleUrls: ['./add-crew-dialog.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class AddCrewDialogComponent {
  newCrew = {
    firstName: '',
    lastName: '',
    title: '',
    nationality: '',
    dailyRate: 0,
    currency: '',
    daysOnBoard: 0,
    totalIncome: 0,
  };

  titles = ['Captain', 'Engineer', 'Cooker', 'Mechanic', 'Deckhand'];
  nationalities = ['USA', 'UK', 'Spain', 'India', 'Canada'];
  currencies = ['USD', 'EUR'];

  constructor(public dialogRef: MatDialogRef<AddCrewDialogComponent>) {}

  calculateTotalIncome(): void {
    this.newCrew.totalIncome =
      this.newCrew.dailyRate * this.newCrew.daysOnBoard;
  }

  save(): void {
    this.dialogRef.close(this.newCrew);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

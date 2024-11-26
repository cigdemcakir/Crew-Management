import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { CertificateTypeService } from '../services/certificate-type.service';
import { CertificateType } from '../models/certificate-type.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
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
    certificates: [] as { type: string; issueDate: string; expiryDate: string }[],
  };

  titles = ['Captain', 'Engineer', 'Cooker', 'Mechanic', 'Deckhand'];
  nationalities = ['USA', 'UK', 'Spain', 'India', 'Canada'];
  currencies = ['USD', 'EUR'];

  certificateTypes: any[] = []; // Sertifika türleri

  constructor(
    public dialogRef: MatDialogRef<AddCrewDialogComponent>,
    private certificateTypeService: CertificateTypeService // Servisi Enjekte Et
  ) {}

  ngOnInit(): void {
    // Sertifika türlerini servisten al
    this.certificateTypes = this.certificateTypeService.getCertificateTypes();
  }

   addCertificate(): void {
    this.newCrew.certificates.push({
      type: '',
      issueDate: '',
      expiryDate: '',
    });
  }

  removeCertificate(index: number): void {
    this.newCrew.certificates.splice(index, 1);
  }

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

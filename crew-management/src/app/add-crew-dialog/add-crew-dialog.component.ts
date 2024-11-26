import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { CertificateTypeService } from '../services/certificate-type.service';
import { CertificateType } from '../models/certificate-type.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
  ],
})
export class AddCrewDialogComponent {
  newCrew = {
    firstName: '',
    lastName: '',
    title: '',
    nationality: '',
    currency: '',
    daysOnBoard: null as number | null,
    dailyRate: null as number | null,
    totalIncome: 0,
    certificates: [
      {
        type: '',
        issueDate: null,
        expiryDate: null,
      },
    ], // Varsayılan
  };

  titles = ['Captain', 'Engineer', 'Cooker', 'Mechanic', 'Deckhand'];
  nationalities = ['USA', 'UK', 'Spain', 'India', 'Canada'];
  currencies = ['USD', 'EUR'];

  certificateTypes: any[] = []; // Sertifika türleri

  constructor(
    public dialogRef: MatDialogRef<AddCrewDialogComponent>,
    private certificateTypeService: CertificateTypeService, // Servisi Enjekte Et
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Sertifika türlerini servisten al
    this.certificateTypes = this.certificateTypeService.getCertificateTypes();
  }

  addCertificate(): void {
    console.log('Adding certificate');
    this.newCrew.certificates.push({
      type: '',
      issueDate: null,
      expiryDate: null,
    });
    console.log('Updated certificates:', this.newCrew.certificates);
  
  }
  
  removeCertificate(index: number): void {
    this.newCrew.certificates.splice(index, 1);
  }

  calculateTotalIncome(): void {
    
    if (this.newCrew.dailyRate !== null && this.newCrew.daysOnBoard !== null) {
      this.newCrew.totalIncome = this.newCrew.dailyRate * this.newCrew.daysOnBoard;
    } else {
      this.newCrew.totalIncome = 0; // Eğer biri null ise toplam gelir sıfır olsun
    }
  }

  save(form: NgForm): void {
    console.log(this.newCrew)
    this.calculateTotalIncome();
    if (form.valid) {
      this.dialogRef.close(this.newCrew);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
  clearField(field: string): void {
    if (field === 'daysOnBoard') {
      this.newCrew.daysOnBoard = null; // Alanı temizle
    } else if (field === 'dailyRate') {
      this.newCrew.dailyRate = null; // Alanı temizle
    }
  }
}

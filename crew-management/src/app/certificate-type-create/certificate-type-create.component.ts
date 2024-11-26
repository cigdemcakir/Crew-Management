import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CertificateTypeService } from '../services/certificate-type.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Reactive Forms Modülü
import { MatFormFieldModule } from '@angular/material/form-field'; // Form Field için
import { MatInputModule } from '@angular/material/input'; // Input Alanı için
import { MatButtonModule } from '@angular/material/button'; // Butonlar için
import { CommonModule } from '@angular/common'; // Angular'ın ortak modülü
import { TranslateModule } from '@ngx-translate/core'; // Çeviri modülü

@Component({
  selector: 'app-certificate-type-create',
  imports: [
    ReactiveFormsModule, // Reactive Forms
    FormsModule, // Template Forms
    MatFormFieldModule, // Material Form Field
    MatInputModule, // Material Input
    MatButtonModule, // Material Button
    CommonModule, // Ortak Angular özellikleri
    TranslateModule, // Çeviri Modülü
  ],
  templateUrl: './certificate-type-create.component.html',
  styleUrls: ['./certificate-type-create.component.css'],
})
export class CertificateTypeCreateComponent {
  certificateTypeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private certificateTypeService: CertificateTypeService,
    private router: Router
  ) {
    this.certificateTypeForm = this.fb.group({
      name: ['', Validators.required], // Name zorunlu
      description: [''], // Description isteğe bağlı
    });
  }

  onSave(): void {
    if (this.certificateTypeForm.valid) {
      this.certificateTypeService.addCertificateType(this.certificateTypeForm.value);
      this.router.navigate(['/']); // Anasayfaya yönlendir
    }
  }

  onCancel(): void {
    this.router.navigate(['/']); // İptal edildiğinde anasayfaya yönlendir
  }
}

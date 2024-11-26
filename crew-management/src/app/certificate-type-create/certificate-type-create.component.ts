import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CertificateTypeService } from '../services/certificate-type.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Reactive Forms Modülü
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-certificate-type-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    TranslateModule,
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
      name: ['', Validators.required],
      description: [''],
    });
  }

  onSave(): void {
    if (this.certificateTypeForm.valid) {
      this.certificateTypeService.addCertificateType(this.certificateTypeForm.value);

      this.router.navigate(['/']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CertificateTypeService } from '../../services/certificate-type.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Reactive Forms Modülü
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

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
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    NavbarComponent
  ],
  templateUrl: './certificate-type-create.component.html',
  styleUrls: ['./certificate-type-create.component.css'],
})
export class CertificateTypeCreateComponent {
  certificateTypeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private certificateTypeService: CertificateTypeService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.certificateTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [''],
    });
  }

  onSave(): void {
    if (this.certificateTypeForm.invalid) {
      this.certificateTypeForm.markAllAsTouched(); // Hataları göster
      return;
    }

    this.certificateTypeService.addCertificateType(this.certificateTypeForm.value).subscribe({
      next: () => {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          autoFocus: false,
          restoreFocus: false,
          data: {
            title: 'Success',
            message: 'Certificate type has been added successfully!',
            cancelText: 'OK',
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/']);
        });
      },
      error: (err: unknown) => {
        console.error('Failed to add certificate type:', err);
      },
    });
  }


  onCancel(): void {
    this.router.navigate(['/']);
  }
}

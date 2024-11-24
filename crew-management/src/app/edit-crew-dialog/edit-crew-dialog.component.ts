import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-crew-dialog',
  standalone: true,
  imports: [TranslateModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,  CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-crew-dialog.component.html',
  styleUrls: ['./edit-crew-dialog.component.css'],
})
// export class EditCrewDialogComponent {
//   constructor(
//     public dialogRef: MatDialogRef<EditCrewDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {}
//
//   save(): void {
//     this.dialogRef.close(this.data); // Düzenlenen verileri geri gönder
//   }
// }

export class EditCrewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditCrewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Gelen veriyi alıyoruz
  ) {}

  // Kaydetme işlemi
  save(): void {
    this.dialogRef.close(this.data); // Değişiklikleri kapatırken geri döndür
  }

  // İptal işlemi
  cancel(): void {
    this.dialogRef.close(); // Dialog'u kapat, hiçbir değişiklik yapmadan
  }
}

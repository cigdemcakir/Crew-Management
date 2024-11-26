import { Injectable } from '@angular/core';
import { CertificateType } from '../models/certificate-type.model';

@Injectable({
  providedIn: 'root',
})
export class CertificateTypeService {
  private certificateTypes: CertificateType[] = [];
  private nextId = 1; // ID sayaç

  getCertificateTypes(): CertificateType[] {
    return [...this.certificateTypes];
  }

  addCertificateType(newType: CertificateType): void {
    newType.id = this.nextId++;
    this.certificateTypes.push(newType);
  }
}

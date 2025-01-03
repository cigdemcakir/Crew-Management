import { Injectable } from '@angular/core';
import { CertificateType } from '../models/certificate-type.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CertificateTypeService {
  private certificateTypesSubject = new BehaviorSubject<any[]>([
    { id: 1, name: 'Safety Training', description: 'Basic safety training' },
    { id: 2, name: 'First Aid', description: 'First aid training' },
    { id: 3, name: 'Fire Fighting', description: 'Fire fighting training' },
  ]);
  private nextId = 4;


  certificateTypes$: Observable<any[]> = this.certificateTypesSubject.asObservable();

   getCertificateTypes(): any[] {
    return this.certificateTypesSubject.value;
  }

  addCertificateType(newType: { name: string; description: string }): Observable<void> {
    return new Observable<void>((observer) => {
      const currentTypes = this.certificateTypesSubject.value;

      this.certificateTypesSubject.next([
        ...currentTypes,
        { id: this.nextId++, ...newType },
      ]);

      // İşlem başarıyla tamamlandı
      observer.next();
      observer.complete();
    });
  }
}

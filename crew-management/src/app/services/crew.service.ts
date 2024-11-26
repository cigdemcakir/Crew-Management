import { Injectable } from '@angular/core';

export interface Crew {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  nationality: string;
  dailyRate: number;
  currency: string;
  daysOnBoard: number;
  totalIncome: number;
  discount?: number;
  certificates?: Certificate[];
}

export interface Certificate {
  id: number;
  type: string;
  issueDate: Date;
  expiryDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  private crewList: Crew[] = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        title: 'Captain',
        nationality: 'USA',
        dailyRate: 150,
        currency: 'USD',
        daysOnBoard: 30,
        totalIncome: 4500, // 150 * 30
        certificates: [
          { id: 1, type: 'Safety Training', issueDate: new Date('2023-01-01'), expiryDate: new Date('2025-01-01') }
        ]
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        title: 'Engineer',
        nationality: 'UK',
        dailyRate: 130,
        currency: 'EUR',
        daysOnBoard: 25,
        totalIncome: 3250, // 130 * 25
        certificates: [
          { id: 2, type: 'Engine Maintenance', issueDate: new Date('2022-06-15'), expiryDate: new Date('2024-06-15') }
        ]
      },
      {
        id: 3,
        firstName: 'Mike',
        lastName: 'Johnson',
        title: 'Cooker',
        nationality: 'Spain',
        dailyRate: 100,
        currency: 'USD',
        daysOnBoard: 20,
        totalIncome: 2000, // 100 * 20
        certificates: [
          { id: 3, type: 'Food Hygiene', issueDate: new Date('2021-12-01'), expiryDate: new Date('2023-12-01') }
        ]
      },
      {
        id: 4,
        firstName: 'Emily',
        lastName: 'Brown',
        title: 'Mechanic',
        nationality: 'Canada',
        dailyRate: 120,
        currency: 'USD',
        daysOnBoard: 28,
        totalIncome: 3360, // 120 * 28
        certificates: [
          { id: 4, type: 'Mechanic Certification', issueDate: new Date('2022-08-01'), expiryDate: new Date('2024-08-01') }
        ]
      },
      {
        id: 5,
        firstName: 'Robert',
        lastName: 'Williams',
        title: 'Deckhand',
        nationality:'India',
        dailyRate: 80,
        currency: 'EUR',
        daysOnBoard: 15,
        totalIncome: 1200, // 80 * 15
        certificates: [
          { id: 5, type: 'Basic Seamanship', issueDate: new Date('2020-05-10'), expiryDate: new Date('2023-05-10') }
        ]
      },
      {
        id: 6,
        firstName: 'Robert',
        lastName: 'Williams',
        title: 'Deckhand',
        nationality:'India',
        dailyRate: 80,
        currency: 'EUR',
        daysOnBoard: 15,
        totalIncome: 1200, // 80 * 15
        certificates: [
          { id: 5, type: 'Basic Seamanship', issueDate: new Date('2020-05-10'), expiryDate: new Date('2023-05-10') }
        ]
      }
  ];

  // Tüm tayfa listesini döndürür
  getCrewList(): Crew[] {
    return [...this.crewList];
  }

  // ID'ye göre tayfayı döndürür
  getCrewById(id: number): Crew | undefined {
    console.log(this.crewList);
    console.log(id);
    var a=this.crewList.find((crew) => crew.id === id);
    console.log(a);
    return this.crewList.find((crew) => crew.id === id);
  }

  // Yeni tayfa ekler
  addCrew(newCrew: Crew): void {
    this.crewList.push(newCrew);
  }

  // Mevcut tayfayı günceller
  updateCrew(updatedCrew: Crew): void {
    const index = this.crewList.findIndex((crew) => crew.id === updatedCrew.id);
    if (index !== -1) {
      this.crewList[index] = updatedCrew;
    }
  }

  // ID'ye göre tayfayı siler
  deleteCrew(id: number): void {
    this.crewList = this.crewList.filter((crew) => crew.id !== id);
  }
}

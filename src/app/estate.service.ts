import { Injectable } from '@angular/core';
import { Estate } from './estate';
import { db } from './my-app-database';


@Injectable()
export class EstateService {
   getEstates(): Promise<Estate[]> {
      return Promise.resolve(db.estates.toArray());
   }
   getEstate(id: number): Promise<Estate> {
      return this.getEstates()
                 .then(estates => estates.find(estate => estate.id === id));
   }
   saveEstate(id: number, estateNumber: string, courtCaseNo: string): void {
      db.estates.put({ id: Number(id), estateNumber: estateNumber, courtCaseNo: courtCaseNo });
   }
   update(estate: Estate): Promise<number> {
      return db.estates.put({ id: estate.id, estateNumber: estate.estateNumber, courtCaseNo: estate.courtCaseNo });
   }
   delete(estate: Estate): void {
      db.estates.delete(estate.id);
   }
}

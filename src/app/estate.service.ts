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
   saveEstate(id: number, firstName: string, lastName: string): void {
      db.estates.put({ id: Number(id), firstName: firstName, lastName: lastName });
   }
   update(estate: Estate): Promise<number> {
      return db.estates.put({ id: estate.id, firstName: estate.firstName, lastName: estate.lastName });
   }
   delete(estate: Estate): void {
      db.estates.delete(estate.id);
   }
}

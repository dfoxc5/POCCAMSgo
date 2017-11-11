import { Injectable } from '@angular/core';
import { Estate } from './estate';
import { db } from './my-app-database';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };

@Injectable()
export class EstateService {

   private estateUrl = 'http://jedc-lt:9080/camsgo-0.0.1-SNAPSHOT/rest/cases/';
   private pulledEstateObs: Observable<Estate>;
   private pulledEstate: Estate;

   constructor(private http: HttpClient) { }

   private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.log(error); // log to console instead
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

   getEstateFromHttp(estateNumber: string): void {
      this.pulledEstateObs = this.http.get<Estate>(this.estateUrl + estateNumber).pipe(),
        catchError(this.handleError<Estate>('getEstate {estateNumber}'));
      this.pulledEstateObs.subscribe(pulledEstate => this.pulledEstate = pulledEstate);
      this.saveEstate(this.pulledEstate);
   }

   postEstateToHttp(estate: Estate): void {
      this.http.post(this.estateUrl + 'update', estate, httpOptions);
   }

   getEstates(): Promise<Estate[]> {
      return Promise.resolve(db.estates.toArray());
   }
   getEstate(id: number): Promise<Estate> {
      return this.getEstates()
                 .then(estates => estates.find(estate => estate.id === id));
   }
   saveEstate(estate: Estate): void {
      db.estates.put({
         id: Number(estate.id),
         estateNumber: estate.estateNumber,
         courtCaseNo: estate.courtCaseNo,
         names: estate.names,
         identifiers: estate.identifiers
      });
   }
   update(estate: Estate): Promise<number> {
      return db.estates.put({
         id: estate.id,
         estateNumber: estate.estateNumber,
         courtCaseNo: estate.courtCaseNo,
         names: estate.names,
         identifiers: estate.identifiers
      });
   }
   delete(estate: Estate): void {
      db.estates.delete(estate.id);
   }
}

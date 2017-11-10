import { Injectable } from '@angular/core';
import { Estate } from './estate';
import { db } from './my-app-database';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';


@Injectable()
export class EstateService {

   private estateUrl = 'http://jedc-lt:9080/camsgo/rest/cases/';
   private pulledEstateObs: Observable<Estate>;
   private pulledEstate: Estate;

   constructor(
      private http: HttpClient,
      private messageService: MessageService) { }
   private log(message: string) {
      this.messageService.add('EstateService: ' + message);
   }

   private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

   getEstateFromHttp(estateNumber: string): void {
      this.pulledEstateObs = this.http.get<Estate>(this.estateUrl + estateNumber).pipe(
        tap(_ => this.log('fetched estate ${estateNumber}')),
        catchError(this.handleError<Estate>('getEstate {estateNumber}'))
      );
      this.pulledEstateObs.subscribe(pulledEstate => this.pulledEstate = pulledEstate);
      this.saveEstate(this.pulledEstate.id, this.pulledEstate.estateNumber, this.pulledEstate.courtCaseNo);
   }
   getEstates(): Promise<Estate[]> {
      return Promise.resolve(db.estates.toArray());
   }
   getEstate(id: number): Promise<Estate> {
      this.messageService.add('fetched stored estates');
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


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

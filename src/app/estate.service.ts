import { Injectable } from '@angular/core';
import { Estate } from './data-model/estate';
import { db } from './my-app-database';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ReferenceCodes } from './data-model/reference-codes';
import { Lookups } from './data-model/lookups';
import { Identifier } from './data-model/identifiers';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EstateService {
   private session: Estate;
   private estateUrl = 'http://camsgosvr1:7001/camsgo/case/';
   private proxyurl = 'https://cors-anywhere.herokuapp.com/';
   private url = 'https://example.com'; // site that doesn’t send Access-Control-*
   private pulledEstateObs: Observable<Estate>;
   private pulledEstate: Estate;
   private pulledLookups: Lookups[];

   constructor(
      private http: HttpClient,
      private datepipe: DatePipe
   ) { }

   setSession(value) {
      this.session = value;
   }
   getSession(): Estate {
      return this.session;
   }

   private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
         // TODO: send the error to remote logging infrastructure
         console.log(error); // log to console instead
         // Let the app keep running by returning an empty result.
         return of(result as T);
      };
   }

   getEstateFromHttp(estateNumber: string): void {
      this.http.get<Estate>(this.estateUrl + estateNumber).subscribe(
         pulledEstate => { this.saveEstate(pulledEstate, true); },
         (err: HttpErrorResponse) => {
         if (err.error instanceof Error) {
            console.log('Client-side Error occured');
         } else {
            console.log('Server-side Error occured');
         }
         }
      );
   }

   getLookupsFromHttp(): void {
      this.http.get<Lookups[]>('http://camsgosvr1:7001/camsgo/case/shortlookups/ID_TYPE')
      .subscribe(
         pulledLookups => { this.saveLookups(pulledLookups); },
         (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
               console.log('Client-side Error occured');
            } else {
               console.log('Server-side Error occured');
            }
         }
      );
      this.http.get<Lookups[]>('http://camsgosvr1:7001/camsgo/case/shortlookups/NAME_TYPE')
      .subscribe(
         pulledLookups => { this.saveLookups(pulledLookups); },
         (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
               console.log('Client-side Error occured');
            } else {
               console.log('Server-side Error occured');
            }
         }
      );
      this.http.get<Lookups[]>('http://camsgosvr1:7001/camsgo/case/shortlookups/SUFFIX')
      .subscribe(
         pulledLookups => { this.saveLookups(pulledLookups); },
         (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
               console.log('Client-side Error occured');
            } else {
               console.log('Server-side Error occured');
            }
         }
      );
   }

   postEstateToHttp(estate: Estate): void {
      console.log(estate);
      this.http.post(this.estateUrl + 'update', estate, httpOptions).subscribe(
         res => { console.log(res); },
         err => { console.log('Error occured: ' + err.error.message + err.status); }
      );
   }

   getEstates(): Promise<Estate[]> {
      return Promise.resolve(db.estates.toArray());
   }
   getEstate(id: number): Promise<Estate> {
      return this.getEstates()
         .then(estates => estates.find(estate => estate.id === id));
   }
   saveEstate(estate: Estate, fromServer: boolean): void {
      if (fromServer) {
         for (const tempid of estate.identifiers) {
         if (tempid.expirationDate != null) {
            const date = new Date(tempid.expirationDate);
            tempid.expirationDate = this.datepipe.transform(date, 'yyyy-MM-dd');
         }
         if (tempid.issueDate != null) {
            const date = new Date(tempid.issueDate);
            tempid.issueDate = this.datepipe.transform(date, 'yyyy-MM-dd');
         }
         }
      }
      db.estates.put({
         id: Number(estate.id),
         casetypeLookup: estate.casetypeLookup,
         estateNumber: estate.estateNumber,
         courtCaseNo: estate.courtCaseNo,
         casestatLookup: estate.casestatLookup,
         caseWeight: estate.caseWeight,
         legalStatusLookup: estate.legalStatusLookup,
         interfaceSent: estate.interfaceSent,
         names: estate.names,
         identifiers: estate.identifiers,
         casenotes: estate.casenotes
      });
   }
   update(estate: Estate): Promise<number> {
      return db.estates.put({
         id: Number(estate.id),
         casetypeLookup: estate.casetypeLookup,
         estateNumber: estate.estateNumber,
         courtCaseNo: estate.courtCaseNo,
         casestatLookup: estate.casestatLookup,
         caseWeight: estate.caseWeight,
         legalStatusLookup: estate.legalStatusLookup,
         interfaceSent: estate.interfaceSent,
         names: estate.names,
         identifiers: estate.identifiers,
         casenotes: estate.casenotes
      });
   }
   delete(estate: Estate): void {
      db.estates.delete(estate.id);
   }
   saveLookups(codes: Lookups[]): void {
      for (const code of codes) {
         db.codes.put({
            id: code.id,
            domainAlias: code.domainAlias,
            appCode: code.appCode,
            description: code.description
         });
      }
   }
   getLookups(domainAlias: string): Promise<Lookups[]> {
      return Promise.resolve(db.codes.where('domainAlias').equalsIgnoreCase(domainAlias).toArray());
   }
}

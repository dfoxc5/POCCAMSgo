import Dexie from 'dexie';
import { Estate } from './data-model/estate';
import { ReferenceCodes } from './data-model/reference-codes';
import { Lookups } from './data-model/lookups';

export class MyAppDatabase extends Dexie {
   estates: Dexie.Table<Estate, number>;
   codes: Dexie.Table<Lookups, number>;

   constructor () {
      super('MyAppDatabase');
      this.version(1).stores({
         estates: `id, casetypLookup, &estateNumber,
                  courtCaseNo, casestatLookup, caseWeight,
                  legalStatusLookup, interfaceSent, *names,
                  *identifiers, *casenotes`,
         codes: `id, domainAlias, &appCode, description`,
      });
      this.estates.mapToClass(Estate);
      this.codes.mapToClass(Lookups);
   }
}

export let db = new MyAppDatabase();

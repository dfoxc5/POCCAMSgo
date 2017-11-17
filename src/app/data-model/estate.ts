import { Name } from './name';
import { Identifier } from './identifiers';

export class Estate {
   id: number;
   estateNumber: string;
   courtCaseNo: string;
   casetypeLookup: string;
   caseWeight: number;
   legalStatusLookup: string;
   interfaceSent: boolean;
   casestatLookup: string;
   names: Name[];
   identifiers: Identifier[];
}

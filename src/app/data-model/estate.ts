import { Name } from './name';
import { Identifier } from './identifiers';
import { Casenotes } from './casenotes';

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
   casenotes: Casenotes[];
}

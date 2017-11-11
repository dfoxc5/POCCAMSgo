import { Name } from './name';
import { Identifier } from './identifiers';

export class Estate {
   id: number;
   estateNumber: string;
   courtCaseNo: string;
   names: Name[];
   identifiers: Identifier[];
}

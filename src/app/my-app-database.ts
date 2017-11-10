import Dexie from 'dexie';
import { Estate } from './estate';

export class MyAppDatabase extends Dexie {
   estates: Dexie.Table<Estate, number>;

   constructor () {
      super('MyAppDatabase');
      this.version(1).stores({
         estates: '++id, firstName, lastName',
      });
      this.estates.mapToClass(Estate);
   }
}

export let db = new MyAppDatabase();

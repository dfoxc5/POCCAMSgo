import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const estate = [
      {
         id: 1,
         estateNumber: '2167468C',
         courtCaseNo: 'ZE 008-829'
      },
      {
         id: 2,
         estateNumber: '2167468B',
         courtCaseNo: 'XE 008-829'
      }
    ];
    return {estate};
  }
}


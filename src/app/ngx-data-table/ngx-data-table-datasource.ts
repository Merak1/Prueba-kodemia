import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface NgxDataTableItem {
  id: string;
  isActive: boolean;
  age: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: NgxDataTableItem[] = [
  {
    id: '5b90705f2214fb1c1c1c4356',
    isActive: true,
    age: 34,
    name: 'Ava Bradshaw',
    company: 'SLOFAST',
    email: 'avabradshaw@slofast.com',
    phone: '+52 (823) 475-3368',
    address: '479 Lawn Court, Datil, Oregon, 6618'
}, {
    id: '5b90705f23180a9b533bfa87',
    isActive: false,
    age: 40,
    name: 'Foley Carpenter',
    company: 'NIPAZ',
    email: 'foleycarpenter@nipaz.com',
    phone: '+52 (875) 414-2884',
    address: '642 Vanderveer Place, Laurelton, Colorado, 9119'
}, {
    id: '5b90705f8e1726d80e6a263e',
    isActive: true,
    age: 34,
    name: 'Shepherd Brooks',
    company: 'ENTROFLEX',
    email: 'shepherdbrooks@entroflex.com',
    phone: '+52 (857) 563-2775',
    address: '426 George Street, Bainbridge, Hawaii, 2581'
}, {
    id: '5b90705f8c9efea4f8247d2f',
    isActive: true,
    age: 32,
    name: 'Fisher Pitts',
    company: 'RUBADUB',
    email: 'fisherpitts@rubadub.com',
    phone: '+52 (816) 417-3425',
    address: '652 Knapp Street, Hondah, Wisconsin, 5819'
}, {
    id: '5b90705fa495b6ede8bfca4d',
    isActive: true,
    age: 36,
    name: 'Wood Cain',
    company: 'MARTGO',
    email: 'woodcain@martgo.com',
    phone: '+52 (972) 506-3308',
    address: '828 Evergreen Avenue, Bethany, Washington, 5878'
}, {
    id: '5b90705fa785c47767e92bcd',
    isActive: false,
    age: 29,
    name: 'Lori Luna',
    company: 'GRUPOLI',
    email: 'loriluna@grupoli.com',
    phone: '+52 (949) 431-3383',
    address: '931 Schenck Place, Trexlertown, Missouri, 9914'
}, {
    id: '5b90705f0efe4b34fc7c1b6d',
    isActive: true,
    age: 31,
    name: 'Mcknight Roberts',
    company: 'BOINK',
    email: 'mcknightroberts@boink.com',
    phone: '+52 (967) 431-3320',
    address: '246 Malta Street, Chicopee, Virginia, 2620'
}, {
    id: '5b90705f193c105646a106ef',
    isActive: true,
    age: 35,
    name: 'Taylor Dyer',
    company: 'GLUKGLUK',
    email: 'taylordyer@glukgluk.com',
    phone: '+52 (979) 540-2048',
    address: '787 Ford Street, Temperanceville, Marshall Islands, 7703'
}, {
    id: '5b90705f8bc8f82fb22ab610',
    isActive: true,
    age: 21,
    name: 'Reilly Kirk',
    company: 'ANDERSHUN',
    email: 'reillykirk@andershun.com',
    phone: '+52 (944) 552-2618',
    address: '951 Veronica Place, Elizaville, Montana, 7106'
}, {
    id: '5b90705f4ddf770e6bf18933',
    isActive: false,
    age: 36,
    name: 'Stewart Kelley',
    company: 'FUTURIS',
    email: 'stewartkelley@futuris.com',
    phone: '+52 (889) 575-2788',
    address: '438 Bevy Court, Oceola, Maine, 6122'
}
];

/**
 * Data source for the NgxDataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class NgxDataTableDataSource extends DataSource<NgxDataTableItem> {
  data: NgxDataTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<NgxDataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: NgxDataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: NgxDataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'isActive': return compare(+a.isActive, +b.isActive, isAsc);
        case 'age': return compare(+a.age, +b.age, isAsc);
        case 'company': return compare(a.company, b.company, isAsc);
        case 'company': return compare(a.company, b.company, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'phone': return compare(a.phone, b.phone, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);

        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

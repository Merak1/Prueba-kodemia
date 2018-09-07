import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { NgxDataTableDataSource } from './ngx-data-table-datasource';

@Component({
  selector: 'app-lib-ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.css']
})
export class NgxDataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: NgxDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // // displayedColumns = ['id', 'name'];
  displayedColumns = ['id' , 'isActive', 'age', 'name', 'company', 'email', 'phone', 'address'];


  ngOnInit() {
    this.dataSource = new NgxDataTableDataSource(this.paginator, this.sort);
  }
}

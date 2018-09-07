import { Component, OnInit } from '@angular/core';
import {NgxDataTableItem} from '../ngx-data-table/ngx-data-table-datasource';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  constructor() { }
NgxDataTableItem: NgxDataTableItem;
  ngOnInit() {
  }

}

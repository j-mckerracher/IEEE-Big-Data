import { Component } from '@angular/core';
import { TABLES } from '../data/tables';

@Component({
  selector: 'app-results-tables',
  templateUrl: './results-tables.html',
  standalone: false,
  styleUrl: './results-tables.scss',
})
export class ResultsTables {
  readonly tables = TABLES;
}

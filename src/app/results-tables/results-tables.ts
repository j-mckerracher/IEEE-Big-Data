import { Component } from '@angular/core';
import { TABLES } from '../data/tables';
import { REFERENCES } from '../data/references';

@Component({
  selector: 'app-results-tables',
  templateUrl: './results-tables.html',
  standalone: false,
  styleUrl: './results-tables.scss',
})
export class ResultsTables {
  readonly tables = TABLES;

  private readonly refNumbers: Record<string, number> = Object.fromEntries(
    REFERENCES.map((ref, index) => [ref.key, index + 1]),
  );

  refNumber(key: string): number {
    return this.refNumbers[key];
  }
}

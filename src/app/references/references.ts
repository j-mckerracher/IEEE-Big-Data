import { Component } from '@angular/core';
import { REFERENCES } from '../data/references';

@Component({
  selector: 'app-references',
  templateUrl: './references.html',
  standalone: false,
  styleUrl: './references.scss',
})
export class References {
  readonly references = REFERENCES;
}

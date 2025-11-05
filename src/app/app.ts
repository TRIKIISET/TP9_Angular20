import { Component, signal } from '@angular/core';
import { GameAdd } from './application/components/game-add/game-add';
import { EmployeAdd } from './exercice/components/employe-add/employe-add';
import { EmployeList } from './exercice/components/employe-list/employe-list';

@Component({
  selector: 'app-root',
  imports: [ GameAdd, EmployeAdd, EmployeList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TP8');
}

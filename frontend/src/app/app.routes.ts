import { Routes } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { HistoryListComponent } from './components/history-list/history-list.component';

export const routes: Routes = [
  { path: '', component: ConverterComponent },
  { path: 'history', component: HistoryListComponent },
  { path: '**', redirectTo: '' },
];

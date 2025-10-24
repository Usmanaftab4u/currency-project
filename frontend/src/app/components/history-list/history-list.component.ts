import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, DatePipe, DecimalPipe],
  template: `
    <div class="container" style="margin-top:12px;">
      <div class="card">
        <div style="display:flex; align-items:center;">
          <h3 style="margin:0;">History</h3>
          <div class="spacer"></div>
          <button mat-button (click)="clear()">Clear</button>
        </div>

        <div *ngIf="items.length === 0" class="small">No conversions yet.</div>

        <div
          *ngFor="let it of items"
          style="padding:10px 0; border-bottom:1px solid #eee;"
        >
          <div class="small">{{ it.ts | date : 'medium' }}</div>
          <div>
            {{ it.amount | number : '1.2-2' }} {{ it.from }} →
            {{ it.result | number : '1.2-2' }} {{ it.to }}
          </div>
          <div class="small">
            Rate ({{ it.date }}): {{ it.rate | number : '1.4-6' }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HistoryListComponent {
  private history = inject(HistoryService);
  get items() {
    return this.history.entries();
  }
  clear() {
    this.history.clear();
  }
}

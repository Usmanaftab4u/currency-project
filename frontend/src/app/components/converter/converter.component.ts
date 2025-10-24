import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon'; 
import { ApiService } from '../../services/api.service';
import { HistoryService } from '../../services/history.service';
import { AmountOnlyDirective } from '../../directives/amount-only.directive';

@Component({
  selector: 'app-converter',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    AmountOnlyDirective,
  ],
  template: `
    <div class="container">
      <div class="card">
        <h2 style="margin:0 0 8px;">Currency Converter</h2>
        <div class="small">Latest & historical rates, mobile-first</div>

        <div class="row row-2" style="margin-top:12px">
          <mat-form-field appearance="outline">
            <mat-label>From</mat-label>
            <mat-select [ngModel]="from()" (ngModelChange)="from.set($event)">
              <mat-option *ngFor="let c of currencyCodes()" [value]="c">
                {{ c }} - {{ names()[c] }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>To</mat-label>
            <mat-select [ngModel]="to()" (ngModelChange)="to.set($event)">
              <mat-option *ngFor="let c of currencyCodes()" [value]="c">
                {{ c }} - {{ names()[c] }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="row row-2">
          <mat-form-field appearance="outline">
            <mat-label>Amount</mat-label>
            <input
              matInput
              [(ngModel)]="amountStr"
              appAmountOnly
              placeholder="e.g. 100"
            />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Historical date (optional)</mat-label>
            <input
              matInput
              [matDatepicker]="picker"
              [(ngModel)]="dateObj"
              (focus)="picker.open()"
            />
            <mat-datepicker-toggle
              matSuffix
              [for]="picker"
            ></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
        </div>

        <div class="row" style="align-items:center;">
          <button
            mat-raised-button
            color="primary"
            (click)="doConvert()"
            [disabled]="loading()"
          >
            Convert
          </button>
          <button mat-button (click)="swap()">Swap</button>
          <div class="spacer"></div>
          <mat-progress-spinner
            *ngIf="loading()"
            diameter="28"
            mode="indeterminate"
          ></mat-progress-spinner>
        </div>
        <div
          *ngIf="result() !== null && rate() !== null"
          style="margin-top:12px;"
        >
          <div class="card">
            <div class="small">
              Rate ({{ rateDateLabel() }}): 1 {{ from() }} =
              {{ rate() | number : '1.4-6' }} {{ to() }}
            </div>
            <h3 style="margin:6px 0 0;">
              {{ amount() | number : '1.2-2' }} {{ from() }} →
              {{ result() | number : '1.2-2' }} {{ to() }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ConverterComponent implements OnInit {
  private api = inject(ApiService);
  private history = inject(HistoryService);

  names = signal<Record<string, string>>({});
  currencyCodes = signal<string[]>([]);
  from = signal('USD');
  to = signal('EUR');
  amountStr = '';
  dateObj: Date | null = null;

  loading = signal(false);
  rate = signal<number | null>(null);
  result = signal<number | null>(null);
  rateDateLabel = signal('latest');

  amount = computed(() => Number(this.amountStr || '0') || 0);

  ngOnInit() {
    this.api.getCurrencies().subscribe({
      next: (res) => {
        const codes = res?.codes ?? [];
        const names = res?.names ?? {};

        this.names.set(names);
        this.currencyCodes.set(codes);

        // set defaults if current selections aren’t present
        if (codes.length && !codes.includes(this.from()))
          this.from.set(codes[0]);
        if (codes.length > 1 && !codes.includes(this.to()))
          this.to.set(codes[1] ?? codes[0]);

        console.log('Loaded currencies:', codes.length); // should log 30+ now
      },
      error: (err) => {
        console.error('Failed to load currencies', err);
        this.names.set({});
        this.currencyCodes.set([]);
      },
    });
  }

  swap() {
    const a = this.from();
    const b = this.to();
    this.from.set(b);
    this.to.set(a);
  }

  doConvert() {
    this.loading.set(true);
    const payload: any = {
      from: this.from(),
      to: this.to(),
      amount: this.amount(),
    };
    if (this.dateObj) {
      payload.date = this.dateObj.toISOString().slice(0, 10); // YYYY-MM-DD
    }

    console.log('Converting with payload:', payload);

    this.api.convert(payload).subscribe({
      next: (res: any) => {
        this.loading.set(false);
        if (res?.result != null && res?.rate != null) {
          this.rate.set(res.rate);
          this.result.set(res.result);
          this.rateDateLabel.set(res.date || 'latest');
          this.history.add({
            ts: new Date().toISOString(),
            from: res.from,
            to: res.to,
            amount: res.amount,
            date: res.date,
            rate: res.rate,
            result: res.result,
          });
        } else {
          this.rate.set(null);
          this.result.set(null);
        }
      },
      error: (_) => this.loading.set(false),
    });
  }
}

import { Injectable, signal } from '@angular/core';

export interface ConversionRecord {
  ts: string; // ISO datetime
  from: string;
  to: string;
  amount: number;
  date: string; // "latest" or YYYY-MM-DD
  rate: number;
  result: number;
}

const KEY = 'conversion-history';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  entries = signal<ConversionRecord[]>(this.load());

  private load(): ConversionRecord[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  }

  private save() {
    localStorage.setItem(KEY, JSON.stringify(this.entries()));
  }

  add(r: ConversionRecord) {
    const list = [r, ...this.entries()].slice(0, 200);
    this.entries.set(list);
    this.save();
  }

  clear() {
    this.entries.set([]);
    this.save();
  }
}

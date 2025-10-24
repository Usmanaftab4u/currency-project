import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  // If backend on same Hostinger domain under /api, this just works.
  // Otherwise set full URL here (e.g., https://api.yourdomain.com/api)
  private base = 'https://currency-project-9od0.onrender.com/api';

  getCurrencies() {
    // typed to the normalized shape returned by your backend
    return this.http.get<{ codes: string[]; names: Record<string, string> }>(
      `${this.base}/currencies`
    );
  }

  convert(q: { from: string; to: string; amount: number; date?: string }) {
    const params = new URLSearchParams({
      from: q.from,
      to: q.to,
      amount: String(q.amount),
    });
    if (q.date) params.set('date', q.date);
    return this.http.get(`${this.base}/convert?${params.toString()}`);
  }
}

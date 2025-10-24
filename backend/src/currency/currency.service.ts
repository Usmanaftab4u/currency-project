import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  private base = process.env.BASE_URL!;
  private apiKey = process.env.CURRENCY_API_KEY!;

  private authParams() {
    return { apikey: this.apiKey };
  }

  async listCurrencies() {
    // freecurrencyapi returns the list under /currencies
    const url = `${this.base}/currencies`;
    const { data } = await axios.get(url, { params: this.authParams() });
    return data; 
  }

  async latest(base: string, symbols?: string[]) {
    const url = `${this.base}/latest`;
    const { data } = await axios.get(url, {
      params: {
        ...this.authParams(),
        base_currency: base,
        currencies: symbols?.join(','),
      },
    });
    return data;
  }

  async historical(date: string, base: string, symbols?: string[]) {
    const url = `${this.base}/historical`;
    const { data } = await axios.get(url, {
      params: {
        ...this.authParams(),
        date, // YYYY-MM-DD
        base_currency: base,
        currencies: symbols?.join(','),
      },
    });
    return data;
  }
}

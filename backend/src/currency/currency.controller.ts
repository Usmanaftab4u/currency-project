import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('api')
export class CurrencyController {
  constructor(private readonly svc: CurrencyService) {}

  @Get('currencies')
  async getCurrencies() {
    const raw = await this.svc.listCurrencies(); // your posted shape
    const map = raw?.data ?? {};
    const codes = Object.keys(map).sort();
    const names: Record<string, string> = {};
    codes.forEach((c) => (names[c] = map[c]?.name ?? c));
    return { codes, names };
  }

  @Get('convert')
  async convert(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: string,
    @Query('date') date?: string,
  ) {
    const amt = Number(amount ?? 1);
    if (!from || !to || Number.isNaN(amt)) {
      return { error: 'Invalid parameters.' };
    }

    const symbols = [to];

    let rate = 1;
    if (date) {
      const hist = await this.svc.historical(date, from, symbols);
      rate = hist?.data?.[date]?.[to];
    } else {
      const latest = await this.svc.latest(from, symbols);
      rate = latest?.data?.[to];
    }

    return {
      from,
      to,
      amount: amt,
      rate,
      date: date ?? 'latest',
      result: rate ? amt * rate : null,
    };
  }
}

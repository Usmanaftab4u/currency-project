import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <div class="container" style="padding-top:8px;">
      <div class="card" style="display:flex; gap:12px; align-items:center;">
        <strong>FX</strong>
        <a routerLink="/">Converter</a>
        <a routerLink="/history">History</a>
        <!-- now a real link -->
        <div class="spacer"></div>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}

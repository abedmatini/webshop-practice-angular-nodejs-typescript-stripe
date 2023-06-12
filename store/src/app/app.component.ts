import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- <router-outlet></router-outlet> -->
    <!-- components goes here -->
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'store';
}

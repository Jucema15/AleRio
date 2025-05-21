import { Component } from '@angular/core';
import { mapMarkers } from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor() {
    mapMarkers;
  }
  ngOnInit(): void {}
}

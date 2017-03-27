import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './sidebar.component.html'
})
export class MenuSidebarComponent implements OnInit {

  items = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = [{
      name: 'Servers',
      cls: 'lnr-inbox',
      url: '/servers'
    }];
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

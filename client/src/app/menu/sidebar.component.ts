import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './sidebar.component.html'
})
export class MenuSidebarComponent implements OnInit {

  items = [];

  ngOnInit() {
    this.items = [{
      name: 'Dashboard',
      cls: 'lnr-home',
      url: '/',
      exact: true
    }, {
      name: 'Servers',
      cls: 'lnr-inbox',
      url: '/servers'
    }];
  }

}

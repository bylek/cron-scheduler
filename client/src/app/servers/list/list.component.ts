import { Component, OnInit } from '@angular/core';
import { Server } from '../server.model';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-servers-list',
  templateUrl: 'list.component.html'
})
export class ServersListComponent implements OnInit {

  public servers: Server[];

  constructor(
    private serverService: ServerService
  ) {
    serverService.servers
      .subscribe(servers => this.servers = servers);
  }

  ngOnInit() {
    this.getServers();
  }

  getServers() {
    this.serverService.getServers()
      .subscribe();
  }
}

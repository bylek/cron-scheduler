import { Component, OnInit } from '@angular/core';
import { Server } from '../server.model';
import { ServerService } from '../server.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-servers-list',
  templateUrl: 'list.component.html'
})
export class ServersListComponent implements OnInit {

  public servers: Observable<Server[]>;

  constructor(
    private serverService: ServerService
  ) {
    this.servers = serverService.servers;
  }

  ngOnInit() {
    this.getServers();
  }

  getServers() {
    this.serverService.getServers()
      .subscribe();
  }
}

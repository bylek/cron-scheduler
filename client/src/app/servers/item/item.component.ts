import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Server } from '../server.model';
import { ServerService } from '../server.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-servers-item',
  templateUrl: 'item.component.html'
})
export class ServersItemComponent implements OnInit {

  serverId: number;

  interval: any;

  server: Server;

  constructor(
    private serverService: ServerService,
    private route: ActivatedRoute
  ) {
    serverService.servers
      .subscribe(servers => {
        this.server = servers.find(({id}) => id == this.serverId);
      });
  }

  ngOnInit() {
    this.getServer()
  }

  getServer() {
    this.route.params
      .map((params: Params) => {
        this.serverId = +params['server_id'];
      })
      .subscribe(() => {
        this.fetchServer();
      });
  }

  fetchServer() {
    this.serverService.getServer(this.serverId)
      .subscribe();

    this.interval = Observable
      .interval(2000)
      .subscribe(() => {
        this.serverService.getServer(this.serverId)
          .subscribe();
      });
  }

  syncServer() {
    this.serverService.syncServer(this.server)
      .subscribe();
  }
}

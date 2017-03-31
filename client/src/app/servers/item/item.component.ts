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
      .flatMap(() => this.serverService.getServer(this.serverId))
      .subscribe();
  }

  syncServer() {
    this.server.syncing = true;
    this.serverService.syncServer(this.server)
      .subscribe();
  }
}

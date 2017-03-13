import { Component, OnInit } from '@angular/core';
import { Server } from './server.model';
import { ServerService } from './server.service';

@Component({
  selector: 'app-server',
  templateUrl: 'server.component.html'
})
export class ServerComponent implements OnInit {

  public servers: Server[];
  public isFetched = false;

  constructor(
    private serverService: ServerService
  ) { }

  ngOnInit() {
    this.getServers();
  }

  getServers() {
    this.serverService.getServers()
      .subscribe(
        servers => {
          this.servers = servers;
          this.isFetched = true;
        }
      );
  }

  onRemove(server: Server) {
    const canRemove = confirm('Are you sure?');
    if (canRemove) {
      this.serverService.deleteServer(server)
        .subscribe(
          () => {
            const index = this.servers.indexOf(server);
            this.servers.splice(index, 1);
          }
        );
    }
  }
}

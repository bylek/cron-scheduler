import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Server } from '../server.model';

@Component({
  selector: 'app-servers-edit',
  templateUrl: 'edit.component.html'
})
export class ServersEditComponent implements OnInit {

  serverId: number;

  server: Server;

  constructor(
    private serverService: ServerService,
    private router: Router,
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
      .switchMap((params: Params) => {
        this.serverId = +params['server_id'];
        return this.serverService.getServer(this.serverId);
      })
      .subscribe();
  }

  onSubmit(server: Server) {
    this.serverService.updateServer(this.server, server)
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

}

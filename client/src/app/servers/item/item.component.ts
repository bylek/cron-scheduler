import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Server } from '../server.model';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-servers-item',
  templateUrl: 'item.component.html'
})
export class ServersItemComponent implements OnInit {

  server: Server;

  constructor(
    private serverService: ServerService
  ) { }

  ngOnInit() {
    this.getServer()
  }

  getServer() {
    // this.serverService.getServer()
  }
}

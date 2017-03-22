import { Component, Input } from '@angular/core';
import { Server } from '../server.model';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-servers-list-item',
  templateUrl: 'item.component.html'
})
export class ServersListItemComponent {

  @Input() server: Server;

  constructor(
    private serverService: ServerService
  ) { }

  onRemove() {
    const canRemove = confirm('Are you sure?');
    if (canRemove) {
      this.serverService.deleteServer(this.server)
        .subscribe();
    }
  }
}

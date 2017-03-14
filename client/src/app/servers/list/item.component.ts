import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Server } from '../server.model';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-servers-list-item',
  templateUrl: 'item.component.html'
})
export class ServersListItemComponent implements OnInit {

  @Input() server: Server;

  @Output()
  afterRemove: EventEmitter<any> = new EventEmitter();

  constructor(
    private serverService: ServerService
  ) { }

  ngOnInit() {
  }

  onRemove() {
    const canRemove = confirm('Are you sure?');
    if (canRemove) {
      this.serverService.deleteServer(this.server)
        .subscribe(
          () => {
            this.afterRemove.emit(this.server);
          }
        );
    }
  }
}

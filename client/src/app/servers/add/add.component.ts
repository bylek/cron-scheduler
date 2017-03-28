import { Component } from '@angular/core';
import { ServerService } from '../server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Server } from '../server.model';

@Component({
  selector: 'app-servers-add',
  templateUrl: 'add.component.html'
})
export class ServersAddComponent {

  constructor(
    private serverService: ServerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onSubmit(server: Server) {
    this.serverService.createServer(server)
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

}

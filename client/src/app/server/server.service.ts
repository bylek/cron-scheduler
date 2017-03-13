import { Injectable } from '@angular/core';
import { AbstractService } from '../shared/abstract.service';
import { AuthHttp } from 'angular2-jwt';
import { Response } from '@angular/http';
import { Server } from './server.model';

@Injectable()
export class ServerService extends AbstractService {

  constructor(http: AuthHttp) {
    super(http);
  }

  getServers() {
    return this.request('get', 'servers', null, (res: Response) => {
      return res.json() || [];
    });
  }

  updateServer(server: Server, data: Object) {
    return this.request('patch', `servers/${server.id}`, data, (res: Response) => {
      return res.json() || null;
    });
  }

  createServer(data) {
    return this.request('post', `servers`, data, (res: Response) => {
      return res.json() || null;
    });
  }

  deleteServer(server: Server) {
    return this.request('delete', `servers/${server.id}`, null, (res: Response) => {
      return res.json() || null;
    });
  }

}

import { Injectable } from '@angular/core';
import { AbstractService } from '../shared/abstract.service';
import { AuthHttp } from 'angular2-jwt';
import { Response } from '@angular/http';
import { Server } from './server.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ServerService extends AbstractService {

  public servers: Observable<Server[]>;

  constructor(
    http: AuthHttp,
    private store: Store<any>
  ) {
    super(http);
    this.servers = store.select('servers');
  }

  getServers() {
    return this.request('get', 'servers', null, res => res.json())
      .map(servers => this.store.dispatch({type: 'ADD_SERVERS', payload: servers}));
  }

  updateServer(server: Server, data: Object) {
    return this.request('patch', `servers/${server.id}`, data, res => res.json())
      .map(server => this.store.dispatch({type: 'UPDATE_SERVER', payload: server}));
  }

  createServer(data) {
    return this.request('post', `servers`, data, res => res.json())
      .map(server => this.store.dispatch({type: 'CREATE_SERVER', payload: server}));
  }

  deleteServer(server: Server) {
    return this.request('delete', `servers/${server.id}`, null, res => res.json())
      .map(() => this.store.dispatch({type: 'DELETE_SERVER', payload: server}));
  }

}

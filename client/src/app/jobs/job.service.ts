import { Injectable } from '@angular/core';
import { AbstractService } from '../shared/abstract.service';
import { AuthHttp } from 'angular2-jwt';
import { Job } from './job.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class JobService extends AbstractService {

  public jobs: Observable<Job[]>;

  constructor(
    http: AuthHttp,
    private store: Store<any>
  ) {
    super(http);
    this.jobs = store.select('jobs');
  }

  getJobs(serverId: Number) {
    let options = null;
    if (serverId) {
      let params: URLSearchParams = new URLSearchParams();
      params.set('server_id', String(serverId));
      options = { search: params };
    }

    return this.request('get', 'jobs', options, res => res.json())
      .map(jobs => this.store.dispatch({type: 'ADD_JOBS', payload: jobs}));
  }

  getJob(id: Number) {
    return this.request('get', `jobs/${id}`, null, res => res.json())
      .map(job => this.store.dispatch({type: 'ADD_JOB', payload: job}));
  }

  updateJob(job: Job, data: Object) {
    return this.request('patch', `jobs/${job.id}`, data, res => res.json())
      .map(job => this.store.dispatch({type: 'UPDATE_JOB', payload: job}));
  }

  createJob(data) {
    return this.request('post', `jobs`, data, res => res.json())
      .map(job => this.store.dispatch({type: 'CREATE_JOB', payload: job}));
  }

  deleteJob(job: Job) {
    return this.request('delete', `jobs/${job.id}`, null, res => res.json())
      .map(() => this.store.dispatch({type: 'DELETE_JOB', payload: job}));
  }

}

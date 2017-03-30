import { Component, OnInit, Input } from '@angular/core';
import { JobService } from '../job.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Job } from '../job.model';
import { Server } from '../../servers/server.model';
import { ServerService } from '../../servers/server.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: 'list.component.html'
})
export class JobsListComponent implements OnInit {

  serverId: number;

  isFetched: boolean = false;

  @Input()
  server: Server;

  jobs: Job[];

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute
  ) {
    jobService.jobs
      .subscribe(jobs => {
        this.jobs = jobs.filter(({server_id}) => server_id == this.serverId)
      });
  }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.route.params
      .switchMap((params: Params) => {
        this.serverId = +params['server_id'];
        return this.jobService.getJobs(this.serverId);
      })
      .subscribe(() => {
        this.isFetched = true;
      });
  }

  toggleActive(job: Job) {
    const canToggle = confirm('Are you sure?');
    if (canToggle) {
      const data = { active: !job.active };
      this.jobService.updateJob(job, data)
        .subscribe();
    }
  }

  onRemove(job: Job) {
    const canRemove = confirm('Are you sure?');
    if (canRemove) {
      this.jobService.deleteJob(job)
        .subscribe();

    }
  }

}

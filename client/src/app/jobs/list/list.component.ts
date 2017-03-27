import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Job } from '../job.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: 'list.component.html'
})
export class JobsListComponent implements OnInit {

  serverId: Number;

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
      .subscribe();
  }

  onRemove(job: Job) {
    const canRemove = confirm('Are you sure?');
    if (canRemove) {
      this.jobService.deleteJob(job)
        .subscribe();

    }
  }

}

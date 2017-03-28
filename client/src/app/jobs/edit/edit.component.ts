import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Job } from '../job.model';

@Component({
  selector: 'app-jobs-edit',
  templateUrl: 'edit.component.html'
})
export class JobsEditComponent implements OnInit {

  jobId: number;

  job: Job;

  constructor(
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    jobService.jobs
      .subscribe(jobs => {
        this.job = jobs.find(({id}) => id == this.jobId)
      })
  }

  ngOnInit() {
    this.getJob();
    this.route.params
      .subscribe((params: Params) => {
        this.jobId = +params['job_id'];
      });
  }

  getJob() {
    this.route.params
      .switchMap((params: Params) => {
        this.jobId = +params['job_id'];
        return this.jobService.getJob(this.jobId);
      })
      .subscribe();
  }

  onSubmit(job: Job) {
    this.jobService.updateJob(this.job, job)
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }

}

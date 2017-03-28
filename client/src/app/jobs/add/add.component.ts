import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Job } from '../job.model';

@Component({
  selector: 'app-jobs-add',
  templateUrl: 'add.component.html'
})
export class JobsAddComponent implements OnInit {

  serverId: number;

  constructor(
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.serverId = +params['server_id'];
      });
  }

  onSubmit(job: Job) {
    job.server_id = this.serverId;
    this.jobService.createJob(job)
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }

}

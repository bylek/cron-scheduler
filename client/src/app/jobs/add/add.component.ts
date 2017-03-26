import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { JobService } from '../job.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-jobs-add',
  templateUrl: 'add.component.html'
})
export class JobsAddComponent implements OnInit {

  form: FormGroup;

  serverId: Number;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getServerId();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      command: ['', Validators.required]
    });
  }

  getServerId() {
    this.route.params
      .subscribe((params: Params) => {
        this.serverId = +params['server_id'];
      });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const job = this.form.value;
    job.server_id = this.serverId;
    this.jobService.createJob(job)
      .subscribe(() => {
        this.router.navigate(['/servers', this.serverId]);
      });
  }

}

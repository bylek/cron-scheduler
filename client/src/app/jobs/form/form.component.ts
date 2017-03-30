import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { JobService } from '../job.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Job } from '../job.model';

@Component({
  selector: 'app-jobs-form',
  templateUrl: 'form.component.html'
})
export class JobsFormComponent implements OnInit {

  form: FormGroup;

  @Output()
  afterSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      command: ['', Validators.required],
      cron_entry: ['', Validators.required]
    });
  }

  @Input()
  set job(job: Job) {
    if (job) {
      this.form.patchValue(job);
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.afterSubmit.emit(this.form.value);
  }

}

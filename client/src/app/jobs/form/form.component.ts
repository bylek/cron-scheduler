import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Job } from '../job.model';
import { Type } from '../type.enum';

@Component({
  selector: 'app-jobs-form',
  templateUrl: 'form.component.html'
})
export class JobsFormComponent implements OnInit {

  form: FormGroup;

  Type = Type;

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
      type: [Type[Type.HOURLY], Validators.required],
      cron_entry: ['']
    });
  }

  get isCustomType() {
    const type = this.form.controls['type'];
    return type.value == Type[Type.CUSTOM];
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

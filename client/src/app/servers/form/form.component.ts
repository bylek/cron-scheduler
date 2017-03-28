import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { Auth } from '../auth.enum';
import { Server } from '../server.model';

@Component({
  selector: 'app-servers-form',
  templateUrl: 'form.component.html'
})
export class ServersFormComponent implements OnInit {

  form: FormGroup;

  Auth = Auth;

  @Output()
  afterSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      address: ['', Validators.required],
      port: [22, Validators.required],
      auth: [Auth[Auth.PASSWORD], Validators.required],
      key: [''],
      password: ['']
    });
  }

  get isKeyAuthMode() {
    const auth = this.form.controls['auth'];
    return auth.value == Auth[Auth.KEY];
  }

  @Input()
  set server(server: Server) {
    if (server) {
      this.form.patchValue(server);
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.afterSubmit.emit(this.form.value);
  }

}

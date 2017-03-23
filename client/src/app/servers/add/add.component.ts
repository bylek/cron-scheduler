import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { Auth } from '../auth.enum';

@Component({
  selector: 'app-servers-add',
  templateUrl: 'add.component.html'
})
export class ServersAddComponent implements OnInit {

  form: FormGroup;

  Auth = Auth;

  constructor(
    private formBuilder: FormBuilder,
    private serverService: ServerService,
    private router: Router
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

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const server = this.form.value;
    this.serverService.createServer(server)
      .subscribe(() => {
        this.router.navigate(['/servers']);
      });
  }

}

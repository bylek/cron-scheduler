import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servers-add',
  templateUrl: 'add.component.html'
})
export class ServersAddComponent implements OnInit {

  form: FormGroup;

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
      port: [22, Validators.required]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      console.log('invalid form');
      return;
    }

    const server = this.form.value;
    console.log('create server', server);
    this.serverService.createServer(server)
      .subscribe(() => {
          this.router.navigate(['/servers']);
        }
      )
  }

}

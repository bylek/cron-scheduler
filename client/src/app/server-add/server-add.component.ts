import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-server-add',
  templateUrl: './server-add.component.html'
})
export class ServerAddComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      ip: ['', Validators.required],
      port: ['']
    })
  }

  onSubmit() {
    if (!this.form.valid) {
      console.log('invalid form');
      return;
    }

    console.log('onSubmit', this.form.value);
  }

}

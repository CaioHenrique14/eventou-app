import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formRegister = this.fb.group({
      name: [''],
      mail: [''],
      password: [''],
      confirmPassword: [''],
      toggle: [false]
    });
  }

  register() {
    // "name": "João",
    // "email": "t.joaoguilherme@gmail.com",
    // "phone": "129996366667",
    // "password": "joaozinho123"

  }

}

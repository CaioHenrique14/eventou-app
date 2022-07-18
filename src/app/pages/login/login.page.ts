import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.fb.group({
      email: [''],
      senha: [''],
      toggle: [false]
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    const body = {
      email: this.formLogin.get('email').value,
      password: this.formLogin.get('senha').value
    };

    console.log(this.formLogin.get('toggle').value);
    if(this.formLogin.get('toggle').value){
      this.storage.set('login',body);
    }
    this.userService.authUser(body).then((res: any) => {
      console.log(res);
      this.storage.set('user',res);
      this.router.navigate(['/tabs']);
    }).catch(async (err: any) => {
      console.error(err);
      const toast = await this.toastController.create({
        header: 'Falha no login',
        message: 'Por favor verifique email e ou senha',
        position: 'bottom',
      });
      toast.present();
    });
    // this.router.navigate(['/tabs']);

  }

}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister: FormGroup;

  verificadorSenha = {
    letraMaiscula: 0,
    letraMinuscula: 0,
    numero: 0,
    quantidade: 0
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private userService: UserService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formRegister = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      birthDate: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      toggle: new FormControl(false)
    },
      {
        validator: this.verificaSenhasIguais('password', 'confirmPassword')
      });
    this.formRegister.get('password').setValidators([this.verificarSenha(this.formRegister.get('password'))]);
  }

  register() {
    const value =  this.formRegister.value;
    const phone = value.phone.replace(/[ ().-]/g, '');

    const userData = {
			name: value.name,
			email: value.email,
      birthDate: value.birthDate,
			password: value.password,
      phone
		};
    this.userService
    .create(userData).then((res)=>{
      console.log(res);
      this.storage.set('user',res);
      this.login(userData.email, userData.password);
    }).catch((err)=>{
      console.error(err);
    });

  }

  login(email,password) {
    const body = {
      email,
      password
    };

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
  }

  verificaSenhasIguais(senha: string, confirmaSenha: string) {
    return (group: FormGroup) => {
      const senhaInput = group.controls[senha];
      const confirmaSenhaInput = group.controls[confirmaSenha];
      if (
        senhaInput.value !== confirmaSenhaInput.value &&
        confirmaSenhaInput.value !== '' &&
        confirmaSenhaInput.value !== null
      ) {
        return confirmaSenhaInput.setErrors({ notEquivalent: true });
      } else {
        return confirmaSenhaInput.setErrors(null);
      }
    };
  }

  verificarSenha(form: AbstractControl) {
    return (control: AbstractControl) => {
      const senha = form.value;


      this.verificadorSenha.numero = 0;
      this.verificadorSenha.letraMaiscula = 0;
      this.verificadorSenha.letraMinuscula = 0;
      this.verificadorSenha.quantidade = 0;

      const caracteresEspeciais = '/([~`!@#$%\^&*+=\-\[\]\\\';,/{}|":<>\?])';
      if (control.invalid) {
        return;
      }
      for (let i = 0; i <= senha.length; i++) {
        const valorAscii = senha.charCodeAt(i);

        // de a até z
        if (valorAscii >= 97 && valorAscii <= 122) { this.verificadorSenha.letraMinuscula = 1; }

        // de A até Z
        if (valorAscii >= 65 && valorAscii <= 90) { this.verificadorSenha.letraMaiscula = 1; }



        // de 0 até 9
        if (valorAscii >= 48 && valorAscii <= 57) { this.verificadorSenha.numero = 1; }

        // indexOf retorna -1 quando NÃO encontra
        if (senha.length >= 8) { this.verificadorSenha.quantidade = 1; }

        // // indexOf retorna -1 quando NÃO encontra
        // if (caracteresEspeciais.indexOf(senha[i]) != -1)
        // 	this.verificadorSenha.caracterEspecial = 1;
      }

      if (this.verificadorSenha.letraMaiscula === 0 ||
        this.verificadorSenha.letraMinuscula === 0 ||
        this.verificadorSenha.numero === 0 ||
        this.verificadorSenha.quantidade === 0) {
        return { requisitosInvalidos: true } as ValidationErrors;
      } else {
        return null as ValidationErrors;
      }

    };
  }

}


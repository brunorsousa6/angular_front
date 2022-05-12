import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consumidor } from 'src/app/model/consumidor.model';
import { Produtor } from 'src/app/model/produtor.model';
import { CadastroService } from 'src/app/service/cadastro.service';
import { LoginService } from 'src/app/service/login.service';

export interface UserSession {
  idUsuario: string | null;
  nomeUsuario: string | null;
  emailUsuario: string | null;
  isProdutor: boolean | null;
}

export function setUsuario(): UserSession {
  return {
    idUsuario: window.localStorage.getItem('idUsuario'),
    nomeUsuario: window.localStorage.getItem('nomeUsuario'),
    emailUsuario: window.localStorage.getItem('emailUsuario'),
    isProdutor: window.localStorage.getItem('isProdutor') === 'true',
  }
}

export function logoutUsuario() {
  window.localStorage.removeItem('idUsuario');
  window.localStorage.removeItem('nomeUsuario');
  window.localStorage.removeItem('emailUsuario');
  window.localStorage.removeItem('isProdutor');
  window.localStorage.removeItem('carrinhoPedido');
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isUserValid: boolean = false;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public cadastroService: CadastroService,
    public loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.construirForm();
  }

  construirForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.required]],
      produtor: ['', [Validators.nullValidator]]
    });
  }

  validaLogin(loginForm: FormGroup) {
    return !(loginForm.get('email')?.valid && loginForm.get('senha')?.valid);
  }

  login(){
    if(this.validaLogin(this.loginForm)) return;

    this.loginForm.get('produtor')?.value ? this.loginProdutor() : this.loginConsumidor();
  }

  loginConsumidor() {
    const params = {
      emailConsumidor: this.loginForm.get('email')?.value,
      senhaConsumidor: this.loginForm.get('senha')?.value,
    };

    this.loginService.loginConsumidor(params).subscribe(this.loginSucesso, this.loginErro);
  }

  loginProdutor() {
    const params = {
      emailProdutor: this.loginForm.get('email')?.value,
      senhaProdutor: this.loginForm.get('senha')?.value,
    };

    this.loginService.loginProdutor(params).subscribe(this.loginSucesso, this.loginErro);
  }


  loginSucesso(data: Consumidor | Produtor) {
    const nomeUsuarioKey = Object.keys(data)[Number(Object.keys(data).findIndex(element => element.includes('nome')))];
    const idUsuarioKey = Object.keys(data)[Number(Object.keys(data).findIndex(element => element.includes('id')))];
    const emailUsuarioKey = Object.keys(data)[Number(Object.keys(data).findIndex(element => element.includes('email')))];
    const isProdutor = Number(Object.keys(data).findIndex(element => element.includes('Produtor')));

    window.localStorage.setItem('idUsuario', data[idUsuarioKey].toString());
    window.localStorage.setItem('nomeUsuario', data[nomeUsuarioKey]);
    window.localStorage.setItem('emailUsuario', data[emailUsuarioKey]);
    window.localStorage.setItem('isProdutor', isProdutor === -1 ? 'false' : 'true');

    window.location.reload();
  }

  loginErro = (err) => {
    this.isUserValid = true;
  }

}

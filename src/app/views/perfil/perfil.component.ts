import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logoutUsuario, setUsuario, UserSession } from '../login/login.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: UserSession = setUsuario();

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    logoutUsuario();
    setTimeout(() => {
      logoutUsuario();
    }, 1000);
    window.location.reload();
  }
}

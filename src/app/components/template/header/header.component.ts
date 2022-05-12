import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { logoutUsuario, setUsuario, UserSession } from 'src/app/views/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  showMenu = false;
  user: UserSession = setUsuario();
  
  constructor() { }

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

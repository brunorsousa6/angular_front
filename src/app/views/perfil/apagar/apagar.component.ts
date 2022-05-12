import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/service/cadastro.service';
import { logoutUsuario, setUsuario } from '../../login/login.component';

@Component({
  selector: 'app-apagar',
  templateUrl: './apagar.component.html',
  styleUrls: ['./apagar.component.scss']
})
export class ApagarComponent implements OnInit {
  user = setUsuario();
  
  constructor(
    public cadastroService: CadastroService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  apagar() {
    if (this.user.isProdutor) {
      this.cadastroService.deleteProdutor(Number(this.user.idUsuario)).subscribe(data => {
        logoutUsuario();
        window.location.reload();
      })
    } else {
      this.cadastroService.deleteConsumidor(Number(this.user.idUsuario)).subscribe(data => {
        logoutUsuario();
        window.location.reload();
      })
    }

  }
}

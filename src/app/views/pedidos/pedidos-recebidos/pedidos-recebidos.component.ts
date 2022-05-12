import { Component, OnInit } from '@angular/core';
import { PedidoConsumidor } from 'src/app/model/pedido-consumidor.model';
import { CadastroService } from 'src/app/service/cadastro.service';
import { setUsuario, UserSession } from '../../login/login.component';

@Component({
  selector: 'app-pedidos-recebidos',
  templateUrl: './pedidos-recebidos.component.html',
  styleUrls: ['./pedidos-recebidos.component.scss']
})
export class PedidosRecebidosComponent implements OnInit {
  user: UserSession = setUsuario();
  pedidosArray: PedidoConsumidor[] = [];

  constructor(
    public cadastroService: CadastroService,
  ) { }

  ngOnInit(): void {
    this.listaProdutos(this.user.idUsuario);
  }

  listaProdutos(idUsuario: string | null) {
    this.cadastroService.getProdutor(Number(idUsuario)).subscribe(data => {
      this.pedidosArray = data.pedidosRecebidos ? data.pedidosRecebidos : [];
    })
  }
}

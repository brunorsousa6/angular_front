import { Component, OnInit } from '@angular/core';
import { PedidoConsumidor } from 'src/app/model/pedido-consumidor.model';
import { Produto } from 'src/app/model/produto.model';
import { CadastroService } from 'src/app/service/cadastro.service';
import { setUsuario, UserSession } from '../../login/login.component';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.scss']
})
export class ListarPedidosComponent implements OnInit {
  user: UserSession = setUsuario();
  pedidosArray: PedidoConsumidor[] = [];

  constructor(
    public cadastroService: CadastroService,
  ) { }

  ngOnInit(): void {
    this.listaProdutos(this.user.idUsuario);
  }

  listaProdutos(idUsuario: string | null) {
    this.cadastroService.getConsumidor(Number(idUsuario)).subscribe(data => {
      this.pedidosArray = data.pedidosConsumidor ? data.pedidosConsumidor : [];
    })
  }
}

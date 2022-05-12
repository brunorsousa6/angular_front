import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { setUsuario, UserSession } from 'src/app/views/login/login.component';
import { Pedido } from 'src/app/model/pedido.model';
import { ProdutoPedido } from 'src/app/model/produto-pedido.model';
import { PedidoService } from 'src/app/service/pedidos.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
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
export class CarrinhoComponent implements OnInit {
  @Input() idProdutor: number;

  showMenu = false;
  user: UserSession = setUsuario();
  listaProdutos: ProdutoPedido[];
  isPedidoFeito: boolean = false;
  isPedidoFeitoErro: boolean = false;
  totalFinal: number = 0;

  constructor(
    public pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.pegaItensCarrinho();
  }

  pegaItensCarrinho() {
    const pedido: any = window.localStorage.getItem('carrinhoPedido');
    const pedidoObject: Pedido = pedido ? JSON.parse(pedido) : '';

    if(pedidoObject) {
      this.listaProdutos = pedidoObject.listaProdutos;
      this.calculaPrecoTotal(this.listaProdutos);
      this.isPedidoFeito = false;
    }
  }

  calculaPrecoTotal(listaProdutos: ProdutoPedido[]) {
    this.totalFinal = listaProdutos.length 
      ? listaProdutos.map(item => item.precoPedido).reduce((acc, value) => acc + value)
      : 0;
  }

  fecharPedido() {
    const pedido: any = localStorage.getItem('carrinhoPedido');
    const pedidoObject: Pedido = pedido ? JSON.parse(pedido) : '';

    if(pedidoObject) {
      const params = pedidoObject.listaProdutos.map(item => {
        return {
          nomePedido: item.nomePedido,
          quantidadePedido: item.quantidadePedido,
        }
      });

      this.pedidoService.postPedido(params, this.idProdutor, localStorage.getItem('idUsuario')).subscribe(data => {
        localStorage.removeItem('carrinhoPedido');
        this.isPedidoFeito = true;
        this.isPedidoFeitoErro = false;
        this.totalFinal = 0;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      err => {
        this.isPedidoFeito = true;
        this.isPedidoFeitoErro = true;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })

    }
  }

  removerItem(event: ProdutoPedido) {
    const pedido: any = localStorage.getItem('carrinhoPedido');
    const pedidoObject: Pedido = pedido ? JSON.parse(pedido) : '';

    if(pedidoObject) {
      const pedidoFiltered = pedidoObject.listaProdutos.filter(item => item.nomePedido !== event.nomePedido);
      pedidoObject.listaProdutos = pedidoFiltered;

      localStorage.setItem('carrinhoPedido', JSON.stringify(pedidoObject));
      this.pegaItensCarrinho();
    }
  }

}

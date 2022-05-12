import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/model/pedido.model';
import { Produto } from 'src/app/model/produto.model';
import { setUsuario, UserSession } from 'src/app/views/login/login.component';

@Component({
  selector: 'app-item-pedido',
  templateUrl: './item-pedido.component.html',
  styleUrls: ['./item-pedido.component.scss']
})
export class ItemPedidoComponent implements OnInit {
  @Input() produto: Produto;
  @Input() idProdutor: number;

  produtoForm: FormGroup;
  itemAdded: boolean = false;
  user: UserSession = setUsuario();
  textoBotao: string = 'Adicionar';

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.construirForm();
    this.checaCarrinhoInicio();
  }

  construirForm() {
    this.produtoForm = this.formBuilder.group({
      quantidade: [0, [Validators.nullValidator]],
    });
  }

  atualizaQtd() {
    if(!this.user.idUsuario) this.router.navigateByUrl('login');
    localStorage.getItem('carrinhoPedido') ? this.atualizaPedido(this.produtoForm.value.quantidade + 1): this.criaPedido(this.produtoForm.value.quantidade + 1);
  }

  criaPedido(qtd: number) {
    const pedido: Pedido = {
      idProdutor: this.idProdutor,
      listaProdutos: [
        {
          nomePedido: this.produto.nomeProduto,
          quantidadePedido: qtd,
          precoPedido: qtd * Number(this.produto.valorProduto),
        }
      ],
    };
    localStorage.setItem('carrinhoPedido', JSON.stringify(pedido));
    this.itemAdicionado();
  }

  atualizaPedido(qtd: number) {
    const pedido: any = localStorage.getItem('carrinhoPedido');
    const pedidoObject: Pedido = pedido ? JSON.parse(pedido) : '';

    if(pedidoObject) {
      if(Number(pedidoObject.idProdutor) !== Number(this.idProdutor)) {
        this.criaPedido(this.produtoForm.value.quantidade + 1);

      } else {
        const produtoNoCarrinho = pedidoObject.listaProdutos.findIndex(item => item.nomePedido === this.produto.nomeProduto);

        if(produtoNoCarrinho !== -1) {
          pedidoObject.listaProdutos[produtoNoCarrinho].quantidadePedido = qtd;
          pedidoObject.listaProdutos[produtoNoCarrinho].precoPedido = qtd * Number(this.produto.valorProduto);

        } else {
          pedidoObject.listaProdutos.push({
            nomePedido: this.produto.nomeProduto,
            quantidadePedido: qtd,
            precoPedido: qtd * Number(this.produto.valorProduto),
          });
        }
      }
      localStorage.setItem('carrinhoPedido', JSON.stringify(pedidoObject))
      this.itemAdicionado();
    }
  }

  itemAdicionado() {
    this.textoBotao = 'Atualizar';
    this.itemAdded = true;
    setTimeout(() => {
      this.itemAdded = false;
    }, 2000);
  }

  checaCarrinhoInicio() {
    const pedido: any = localStorage.getItem('carrinhoPedido');
    const pedidoObject: Pedido = pedido ? JSON.parse(pedido) : '';

    if(pedidoObject && Number(pedidoObject.idProdutor) === Number(this.idProdutor)) {
      const produtoNoCarrinho = pedidoObject.listaProdutos.findIndex(item => item.nomePedido === this.produto.nomeProduto);

      if(produtoNoCarrinho !== -1) {
        this.produtoForm.setValue({ quantidade: pedidoObject.listaProdutos[produtoNoCarrinho].quantidadePedido - 1 });
        this.textoBotao = 'Atualizar';
      }
    }
  }
}

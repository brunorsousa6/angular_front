import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProdutoPedido } from 'src/app/model/produto-pedido.model';

@Component({
  selector: 'app-item-carrinho',
  templateUrl: './item-carrinho.component.html',
  styleUrls: ['./item-carrinho.component.scss']
})
export class ItemCarrinhoComponent implements OnInit {
  @Input() produto: ProdutoPedido;
  @Output() removerItem: EventEmitter<ProdutoPedido> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  removerProduto() {
    this.removerItem.emit(this.produto);
  }
}

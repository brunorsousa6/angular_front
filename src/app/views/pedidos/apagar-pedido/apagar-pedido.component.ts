import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/service/pedidos.service';

@Component({
  selector: 'app-apagar-pedido',
  templateUrl: './apagar-pedido.component.html',
  styleUrls: ['./apagar-pedido.component.scss']
})
export class ApagarPedidoComponent implements OnInit {
  idPedido: number;

  constructor(
    public pedidoService: PedidoService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idPedido = params['idPedido'];
    });
  }

  apagar() {
    this.pedidoService.deletePedido(this.idPedido).subscribe(data => {
      this.router.navigateByUrl('/pedidos/listar')
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/service/pedidos.service';

@Component({
  selector: 'app-apagar-pedidos-recebidos',
  templateUrl: './apagar-pedidos-recebidos.component.html',
  styleUrls: ['./apagar-pedidos-recebidos.component.scss']
})
export class ApagarPedidosRecebidosComponent implements OnInit {
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
      this.router.navigateByUrl('/pedidos/recebidos')
    })
  }
}

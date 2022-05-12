import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { Consumidor } from '../model/consumidor.model';
import { Produto } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly API = `${environment.API}`;

  constructor(
    private http: HttpClient,
  ) { }

  postPedido(params, idProdutor, idConsumidor): Observable<Consumidor> {
    return this.http.post<Consumidor>(`${this.API}/consumidor/pedidos/${idProdutor}/${idConsumidor}`, params).pipe(take(1));
  }

  deletePedido(idPedido): Observable<void> {
    return this.http.delete<void>(`${this.API}/consumidor/delete/pedido/${idPedido}`).pipe(take(1));
  }

  putPedido(params, idPedido): Observable<Produto> {
    return this.http.put<Produto>(`${this.API}/consumidor/alterar/pedido/${idPedido}`, params).pipe(take(1));
  }


}

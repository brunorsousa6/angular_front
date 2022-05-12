import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { Produto } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = `${environment.API}`;

  constructor(
    private http: HttpClient,
  ) { }

  postProduto(params, id): Observable<Produto> {
    return this.http.post<Produto>(`${this.API}/produtor/cadastro/produto/${id}`, params).pipe(take(1));
  }

  deleteProduto(id): Observable<Produto> {
    return this.http.delete<Produto>(`${this.API}/produtor/delete/produto/${id}`).pipe(take(1));
  }

  putProduto(params, id): Observable<Produto> {
    return this.http.post<Produto>(`${this.API}/produtor/alterar/produto/${id}`, params).pipe(take(1));
  }


}

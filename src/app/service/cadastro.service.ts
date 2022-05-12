import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Consumidor } from '../model/consumidor.model';
import { Produtor } from '../model/produtor.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly API = `${environment.API}`;

  constructor(
    private http: HttpClient,
  ) { }

  //Produtor
  getProdutores(): Observable<Produtor[]> {
    return this.http.get<Produtor[]>(`${this.API}/produtor`).pipe(take(1));
  }

  getProdutor(id: number): Observable<Produtor> {
    return this.http.get<Produtor>(`${this.API}/produtor/${id}`).pipe(take(1));
  }

  postProdutor(params): Observable<Produtor> {
    return this.http.post<Produtor>(`${this.API}/produtor`, params).pipe(take(1));
  }

  patchProdutor(params, id): Observable<Produtor> {
    return this.http.patch<Produtor>(`${this.API}/produtor/${id}`, params).pipe(take(1));
  }

  deleteProdutor(id: number): Observable<Produtor> {
    return this.http.delete<Produtor>(`${this.API}/produtor/${id}`).pipe(take(1));
  }

  //Consumidor
  getConsumidores(): Observable<Consumidor[]> {
    return this.http.get<Consumidor[]>(`${this.API}/consumidor`).pipe(take(1));
  }

  getConsumidor(id: number): Observable<Consumidor> {
    return this.http.get<Consumidor>(`${this.API}/consumidor/${id}`).pipe(take(1));
  }

  postConsumidor(params): Observable<Consumidor> {
    return this.http.post<Consumidor>(`${this.API}/consumidor`, params).pipe(take(1));
  }

  patchConsumidor(params, id): Observable<Consumidor> {
    return this.http.patch<Consumidor>(`${this.API}/consumidor/${id}`, params).pipe(take(1));
  }

  deleteConsumidor(id: number): Observable<Consumidor> {
    return this.http.delete<Consumidor>(`${this.API}/consumidor/${id}`).pipe(take(1));
  }

  //Valida Email
  validaEmail(email: string): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.API}/api/agricolab/v1/validacao/${email}`).pipe(take(1));
  }
}

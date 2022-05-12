import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Produtor } from '../model/produtor.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  private readonly API = `${environment.API}`;

  constructor(
    private http: HttpClient,
  ) { }

  //Produtor
  findProdutores(lat: number, lng: number): Observable<Produtor[]> {
    return this.http.get<Produtor[]>(`${this.API}/consumidor/nextprodutores/${lat}/${lng}`).pipe(take(1));
  }
}

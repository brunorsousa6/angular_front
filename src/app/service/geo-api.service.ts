import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeoApiMapTilerData } from '../model/geo-api-maptiler.model';
import { GeoApi } from '../model/geo-api.model';

@Injectable({
  providedIn: 'root'
})
export class GeoApiService {

  private readonly GEO_API = `${environment.GEO_API}`;
  private readonly GEO_API_MAPTILER = `${environment.GEO_API_MAPTILER}`;
  private readonly accessKey: string = '37823801a3838d653b0b00531be7a55b';
  private readonly accessKeyMapTiler: string = 'rOWMCvQS4fuQOnVJzQEQ';

  limit: number = 1;
  output: string = 'json';

  constructor(
    private http: HttpClient,
  ) { }

  getGeocoding(endereco: string): Observable<GeoApi> {
    return this.http.get<GeoApi>(`${this.GEO_API}?access_key=${this.accessKey}&limit=${this.limit}&output=${this.output}&query=${endereco}`).pipe(take(1));
  }

  getGeocodingMapTiler(endereco: string): Observable<GeoApiMapTilerData> {
    return this.http.get<GeoApiMapTilerData>(`${this.GEO_API_MAPTILER}/${endereco}.json?key=${this.accessKeyMapTiler}`).pipe(take(1));
  }

}

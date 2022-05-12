import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as maptiler from '@maptiler/geocoder';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Produtor } from 'src/app/model/produtor.model';
import { MapaService } from 'src/app/service/mapa.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit, AfterViewInit {
  mapa: any;
  url = './assets/autocomplete.html';
  urlSafe: SafeResourceUrl;
  marcadoresArray: any = [];
  distanciaValue: number = 1;

  constructor(
    public sanitizer: DomSanitizer,
    public mapaService: MapaService
  ) { }

  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  ngAfterViewInit(): void {
    this.iniciaMapa();
    this.autoCompleteMaptiler();
  }

  iniciaMapa(): void {
    const latlngInicio = {lat: -23.6442261, lng: -46.5306952};

    this.mapa = L.map('mapa', {zoomControl: false});
    this.mapa.setView(latlngInicio, 15);
    this.tileMapbox().addTo(this.mapa);
    L.control.zoom({position: 'bottomright'}).addTo(this.mapa);

    // this.pegarGeolocation();
  }

  //Usando Tiles do OpenStreetMap
  tileOpenStreetMap() {
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    return tiles;
  }

  //Usando Tiles do Mapbox
  tileMapbox() {
    const tileUrl = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoid2VzbGV5YnMwMDEiLCJhIjoiY2tibmI4NmNnMXBjajJzazBvZXNoOTQ2MyJ9.bVWk-q7qy71I279L4BEv6Q'
    });
    return tileUrl;
  }

  //Usando Tiles do Maptiler
  tileMaptiler() {
    let gl = L.mapboxGL({
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        accessToken: 'not-needed',
        style: 'https://api.maptiler.com/maps/e8c1f31f-ffea-44fa-9cdc-e117fbc11ceb/style.json?key=rOWMCvQS4fuQOnVJzQEQ'
    });
    return gl;
  }

  //Pegar a Geolocalização do usuário
  pegarGeolocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setPosicao)
    }
  }

  setPosicao(posicao){
    this.mapa.setView([posicao.coords.latitude, posicao.coords.longitude], 17);
    let latlng = {lat: posicao.coords.latitude, lng: posicao.coords.longitude};
  }

  //Autocomplete de endereço do Maptiler
  autoCompleteMaptiler() {
    const geocoder = new maptiler.Geocoder({
      input: 'input-pesquisa',
      key: 'rOWMCvQS4fuQOnVJzQEQ',
      language: ['br']
    });

    geocoder.on('select', function(item) {
      console.log('Selected', item);
    });
  }

  buscaProdutores() {
    const endereco: any = window.localStorage.getItem('inputPesquisa');
    const enderecoObject = endereco ? JSON.parse(endereco) : '';

    this.limpaMarcadores(this.marcadoresArray);

    if(enderecoObject) {
      this.mapaService.findProdutores(enderecoObject.center[1], enderecoObject.center[0]).subscribe(data => {
        this.criaMarcadores(data);
      })

      this.mapa.panTo([enderecoObject.center[1], enderecoObject.center[0]]);
    }
  }

  limpaMarcadores(marcadores: any[]) {
    marcadores.forEach(item => {
      this.mapa.removeLayer(item);
    });
  }

  criaMarcadores(produtores: Produtor[]) {
    produtores.forEach(produtor => {
      produtor.enderecoProdutor = produtor.enderecoProdutor ? produtor.enderecoProdutor.split(';').join(' ') : '';
      
      const popup = this.criaPopup(produtor);
      const marcador = L.marker([Number(produtor.latitudeProdutor), Number(produtor.longitudeProdutor)]).bindPopup(popup).addTo(this.mapa);
      // const marcador = L.marker([Number(produtor.latitudeProdutor), Number(produtor.longitudeProdutor)], {icon: this.marcadorPadrao}).bindPopup(popup).addTo(this.mapa);
      this.marcadoresArray.push(marcador);
    })
  }

  criaPopup(produtor: Produtor): string {
    return `<p style="font-size: 1.2rem; font-weight: bold; color: black;">${produtor.nomeProdutor}</p>
    <p style="font-size: 1rem; font-weight: 400; color: black; margin: 0;"><strong>Telefone:</strong> ${produtor.telefoneProdutor}</p>
    <p style="font-size: 1rem; font-weight: 400; color: black; margin: 0;"><strong>Email:</strong> ${produtor.emailProdutor}</p>
    <p style="font-size: 1rem; font-weight: 400; color: black; margin-top: 0;"><strong>Endereço:</strong> ${produtor.enderecoProdutor}</p>
    <a class="simple-button-blue" style="padding: 0.5rem 1.5rem; color: #fff;" href="../pedidos/${produtor.idProdutor}">Ver Produtos</a>
    <p style="height: 0.1rem;"></p>`;
  }

  //Criação dos marcadores personalizados no Leaflet
  marcadorPadrao = L.Icon.extend({
    options: {
      iconUrl: './assets/pointer_green.png',
      shadowUrl: './assets/png_1x1.png',
      iconSize:     [37, 54],
      shadowSize:   [46, 58],
      iconAnchor:   [18, 55],
      shadowAnchor: [5, 56],
      popupAnchor:  [2, -60]
    }
  });
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produtor } from 'src/app/model/produtor.model';
import { CadastroService } from 'src/app/service/cadastro.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  idProdutor: string;
  produtor: Produtor = new Produtor();

  constructor(
    private route: ActivatedRoute,
    private cadastroService: CadastroService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.idProdutor = id ? id : '';
    this.getProdutor(this.idProdutor);
  }

  getProdutor(id: string) {
    this.cadastroService.getProdutor(Number(id)).subscribe(data => {
      this.produtor = data;
      this.produtor.enderecoProdutor = this.produtor.enderecoProdutor ? this.produtor.enderecoProdutor.split(';').join(' ') : '';
    })
  }

}

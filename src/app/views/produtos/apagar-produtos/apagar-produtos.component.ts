import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/service/produtos.service';
import { logoutUsuario, setUsuario } from '../../login/login.component';

@Component({
  selector: 'app-apagar-produtos',
  templateUrl: './apagar-produtos.component.html',
  styleUrls: ['./apagar-produtos.component.scss']
})
export class ApagarProdutosComponent implements OnInit {
  user = setUsuario();
  idProduto: number;
  nomeProduto: string;

  constructor(
    public produtoService: ProdutoService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idProduto = params['idProduto'];
      this.nomeProduto = params['nomeProduto'];
    });
  }

  apagar() {
    this.produtoService.deleteProduto(this.idProduto).subscribe(data => {
      this.router.navigateByUrl('/produtos/listar')
    })
  }

}

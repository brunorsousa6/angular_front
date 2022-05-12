import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormInput } from 'src/app/components/cadastro-produtor/cadastro-produtor.component';
import { ProdutoService } from 'src/app/service/produtos.service';
import { setUsuario, UserSession } from '../../login/login.component';

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.scss']
})
export class EditarProdutosComponent implements OnInit {
  user: UserSession = setUsuario();
  cadastroForm: FormGroup;
  idProduto: number;
  nomeProduto: string;
  quantidadeProduto: number;
  valorProduto: number;

  formInputs: FormInput[] = [
    { name: 'nome', label: 'Nome do Produto', type: 'text', value: '', obrigatorio: true },
    { name: 'quantidade', label: 'Quantidade', type: 'text', value: '', obrigatorio: true },
    { name: 'valor', label: 'Valor (R$)', type: 'text', value: '', obrigatorio: true },
  ]

  showForm: boolean = true;
  isFormSucess: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public produtoService: ProdutoService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idProduto = params['idProduto'];
      this.nomeProduto = params['nomeProduto'];
      this.quantidadeProduto = params['quantidadeProduto'];
      this.valorProduto = params['valorProduto'];
    });
    this.construirForm();
  }

  construirForm() {
    this.cadastroForm = this.formBuilder.group({
      nome: [this.nomeProduto, [Validators.required]],
      quantidade: [this.quantidadeProduto, [Validators.required]],
      valor: [this.valorProduto, [Validators.required]],
    });
  }

  cadastraProduto(event){
    if(!this.cadastroForm.valid) return;
 
    const params = {
      nomeProduto: this.cadastroForm.get('nome')?.value,
      quantidadeProduto: Number(this.cadastroForm.get('quantidade')?.value),
      valorProduto: Number(this.cadastroForm.get('valor')?.value.replace(',', '.')),
    };

    this.produtoService.putProduto(params, this.idProduto).subscribe(data => {
      this.showForm = false;
      this.isFormSucess = true;
    },
    err => {
      this.showForm = false;
      this.isFormSucess = false;
    });
  }
}

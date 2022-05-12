import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormInput } from 'src/app/components/cadastro-produtor/cadastro-produtor.component';
import { ProdutoService } from 'src/app/service/produtos.service';
import { setUsuario, UserSession } from '../../login/login.component';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.scss']
})
export class CadastrarProdutosComponent implements OnInit {
  user: UserSession = setUsuario();
  cadastroForm: FormGroup;
  
  formInputs: FormInput[] = [
    { name: 'nome', label: 'Nome do Produto', type: 'text', value: '', obrigatorio: true },
    { name: 'quantidade', label: 'Quantidade', type: 'text', value: '', obrigatorio: true },
    { name: 'valor', label: 'Valor (R$)', type: 'text', value: '', obrigatorio: true },
  ]

  showForm: boolean = true;
  isFormSucess: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.construirForm();
  }

  construirForm() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });
  }

  cadastraProduto(event){
    if(!this.cadastroForm.valid) return;
 
    const params = {
      nomeProduto: this.cadastroForm.get('nome')?.value,
      quantidadeProduto: Number(this.cadastroForm.get('quantidade')?.value),
      valorProduto: Number(this.cadastroForm.get('valor')?.value.replace(',', '.')),
    };

    this.produtoService.postProduto(params, this.user.idUsuario).subscribe(data => {
      this.showForm = false;
      this.isFormSucess = true;
    },
    err => {
      this.showForm = false;
      this.isFormSucess = false;
    });
  }

}

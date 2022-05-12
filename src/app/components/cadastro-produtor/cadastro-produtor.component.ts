import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from 'src/app/service/cadastro.service';
import { GeoApiService } from 'src/app/service/geo-api.service';

export interface FormInput {
  name: string;
  label: string;
  type: string;
  value: string;
  obrigatorio: boolean;
}

@Component({
  selector: 'app-cadastro-produtor',
  templateUrl: './cadastro-produtor.component.html',
  styleUrls: ['./cadastro-produtor.component.scss']
})
export class CadastroProdutorComponent implements OnInit {
  @Output() voltarEvent = new EventEmitter<string>();
  
  cadastroForm: FormGroup;
  
  formInputs: FormInput[] = [
    { name: 'nome', label: 'Nome Completo', type: 'text', value: '', obrigatorio: true },
    { name: 'email', label: 'Email', type: 'email', value: '', obrigatorio: true },
    { name: 'senha', label: 'Senha', type: 'password', value: '', obrigatorio: true },
    { name: 'telefone', label: 'Telefone', type: 'tel', value: '', obrigatorio: false },
    { name: 'cnpj', label: 'CNPJ', type: 'text', value: '', obrigatorio: false },
    { name: 'cpf', label: 'CPF', type: 'text', value: '', obrigatorio: false },
    { name: 'enderecoRua', label: 'Rua', type: 'text', value: '', obrigatorio: true },
    { name: 'enderecoNumero', label: 'Número', type: 'text', value: '', obrigatorio: false },
    { name: 'enderecoComplemento', label: 'Complemento', type: 'text', value: '', obrigatorio: false },
    { name: 'enderecoBairro', label: 'Bairro', type: 'text', value: '', obrigatorio: true },
    { name: 'enderecoCidade', label: 'Cidade', type: 'text', value: '', obrigatorio: true },
    { name: 'enderecoEstado', label: 'Estado', type: 'text', value: '', obrigatorio: true },
  ]

  qualInput: number = 0;
  inputFinal: number = this.formInputs.length - 1;
  campoInvalido: boolean | undefined = false;
  isEmailCadastrado: boolean | undefined = false;
  showForm: boolean = true;
  isFormSucess: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public cadastroService: CadastroService,
    public geoApiService: GeoApiService,
  ) { }

  ngOnInit(): void {
    this.construirForm();
  }

  construirForm() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.required]],
      telefone: ['', [Validators.nullValidator]],
      cnpj: ['', [Validators.nullValidator]],
      cpf: ['', [Validators.nullValidator]],
      enderecoRua: ['', [Validators.required]],
      enderecoNumero: ['', [Validators.nullValidator]],
      enderecoComplemento: ['', [Validators.nullValidator]],
      enderecoBairro: ['', [Validators.required]],
      enderecoCidade: ['', [Validators.required]],
      enderecoEstado: ['', [Validators.required]],
    });
  }

  avancaForm = () => {
    if(this.validaInput(this.qualInput)) return;
    if(this.formInputs[this.qualInput].name === 'email') {
      this.validaEmail(this.cadastroForm.get('email')?.value);
    } else {
      if(this.qualInput < this.inputFinal) this.qualInput++;
    };
  }

  voltaForm(): void {
    if(this.qualInput > 0) {
      this.qualInput--;
      this.campoInvalido = false;
      this.isEmailCadastrado = false;
    } else {
      this.voltarEvent.emit();
    }
  }

  validaEmail = (email: string) => {
    this.cadastroService.validaEmail(email).subscribe(data => {
      if(data) {
        this.campoInvalido = true;
        this.isEmailCadastrado = true;
      } else {
        this.isEmailCadastrado = false;
        if(this.qualInput < this.inputFinal) this.qualInput++;
      }
    })
  }
  
  validaInput(position: number): boolean {
    const input = this.formInputs[position];
    const isValid = !this.cadastroForm.get(input.name)?.valid;
    this.campoInvalido = isValid;

    return isValid;
  }

  isHidden(inputNumber: number) {
    return this.qualInput === inputNumber ? false : true;
  }

  fazCadastro(event){
    const rua = this.cadastroForm.get('enderecoRua')?.value;
    const numero = this.cadastroForm.get('enderecoNumero')?.value;
    const bairro = this.cadastroForm.get('enderecoBairro')?.value;
    const cidade = this.cadastroForm.get('enderecoCidade')?.value;
    const estado = this.cadastroForm.get('enderecoEstado')?.value;

    const endereco = 
      (rua ? rua : '') + ';' +
      (numero ? numero : '') + ';' +
      (bairro ? bairro : '') + ';' +
      (cidade ? cidade : '') + ';' +
      (estado ? estado : '');

    const params = {
      nomeProdutor: this.cadastroForm.get('nome')?.value,
      emailProdutor: this.cadastroForm.get('email')?.value,
      senhaProdutor: this.cadastroForm.get('senha')?.value,
      telefoneProdutor: this.cadastroForm.get('telefone')?.value,
      cnpjProdutor: this.cadastroForm.get('cnpj')?.value,
      cpfProdutor: this.cadastroForm.get('cpf')?.value,
      complementoEnderecoProdutor: this.cadastroForm.get('enderecoComplemento')?.value,
      enderecoProdutor: endereco,
      latitudeProdutor: 0,
      longitudeProdutor: 0,
    };

    const enderecoGeo =
      (rua && rua.toUpperCase().includes('RUA') ? '' : 'Rua ') +
      (rua ? rua + ' ' : '') +
      (numero ? numero + ' ' : '') +
      (cidade ? cidade + ' ' : '') +
      (estado ? estado + ' ' : '');

    this.geoApiService.getGeocodingMapTiler(enderecoGeo).subscribe(geoData => {

      if(geoData && geoData.features && geoData.features.length > 0) {
        params.latitudeProdutor = geoData.features[0].center[1];
        params.longitudeProdutor = geoData.features[0].center[0];
      }
  
      this.cadastroService.postProdutor(params).subscribe(data => {
        this.showForm = false;
        this.isFormSucess = true;
      },
      err => {
        this.showForm = false;
        this.isFormSucess = false;
      });
    },
    err => {
      this.showForm = false;
      this.isFormSucess = false;
    });

  }
}

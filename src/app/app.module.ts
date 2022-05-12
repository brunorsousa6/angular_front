import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastroProdutorComponent } from './components/cadastro-produtor/cadastro-produtor.component';
import { CadastroConsumidorComponent } from './components/cadastro-consumidor/cadastro-consumidor.component';
import { MapaComponent } from './views/mapa/mapa.component';
import { TimeComponent } from './views/time/time.component';
import { ContatoComponent } from './views/contato/contato.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { InnerHeaderComponent } from './components/template/inner-header/inner-header.component';
import { ApagarComponent } from './views/perfil/apagar/apagar.component';
import { EditarComponent } from './views/perfil/editar/editar.component';
import { ProdutosComponent } from './views/produtos/produtos.component';
import { ListarProdutosComponent } from './views/produtos/listar-produtos/listar-produtos.component';
import { EditarProdutosComponent } from './views/produtos/editar-produtos/editar-produtos.component';
import { ApagarProdutosComponent } from './views/produtos/apagar-produtos/apagar-produtos.component';
import { CadastrarProdutosComponent } from './views/produtos/cadastrar-produtos/cadastrar-produtos.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { ItemPedidoComponent } from './components/item-pedido/item-pedido.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { ListarPedidosComponent } from './views/pedidos/listar-pedidos/listar-pedidos.component';
import { ItemCarrinhoComponent } from './components/item-carrinho/item-carrinho.component';
import { ApagarPedidoComponent } from './views/pedidos/apagar-pedido/apagar-pedido.component';
import { PedidosRecebidosComponent } from './views/pedidos/pedidos-recebidos/pedidos-recebidos.component';
import { ApagarPedidosRecebidosComponent } from './views/pedidos/apagar-pedidos-recebidos/apagar-pedidos-recebidos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    CadastroComponent,
    LoginComponent,
    CadastroProdutorComponent,
    CadastroConsumidorComponent,
    MapaComponent,
    TimeComponent,
    ContatoComponent,
    PerfilComponent,
    InnerHeaderComponent,
    ApagarComponent,
    EditarComponent,
    ProdutosComponent,
    ListarProdutosComponent,
    EditarProdutosComponent,
    ApagarProdutosComponent,
    CadastrarProdutosComponent,
    PedidosComponent,
    ItemPedidoComponent,
    CarrinhoComponent,
    ListarPedidosComponent,
    ItemCarrinhoComponent,
    ApagarPedidoComponent,
    PedidosRecebidosComponent,
    ApagarPedidosRecebidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { PedidoConsumidor } from "./pedido-consumidor.model";
import { Produto } from "./produto.model";

export class Produtor {
    idProdutor: number;
    nomeProdutor: string;
    tipoProdutor: string;
    emailProdutor: string;
    senhaProdutor: string;
    pedidosRecebidos: PedidoConsumidor[];
    produtos: Produto[];
    cnpjProdutor: string;
    cpfProdutor: string;
    telefoneProdutor: string;
    enderecoProdutor: string;
    complementoEnderecoProdutor: string;
    latitudeProdutor: string;
    longitudeProdutor: string;
}

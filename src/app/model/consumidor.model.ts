import { PedidoConsumidor } from "./pedido-consumidor.model";

export class Consumidor {
    idConsumidor: number;
    tipoConsumidor: string;
    segmentoConsumidorPJ: string;
    nomeConsumidor: string;
    emailConsumidor: string;
    senhaConsumidor: string;
    cnpjConsumidor: string;
    cpfConsumidor: string;
    telefoneConsumidor: string;
    enderecoConsumidor: string;
    complementoEnderecoConsumidor: string;
    latitudeConsumidor: string;
    longitudeConsumidor: string;
    pedidosConsumidor: PedidoConsumidor[];
    pedidos: PedidoConsumidor[];
}

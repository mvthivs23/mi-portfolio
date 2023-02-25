import { ItemVenta } from "./item-venta";
import { Cliente } from "src/app/clientes/cliente";
export class Venta {

    id: number;
    descripcion: string;
    observacion: string;
    items: Array<ItemVenta>=[];
    cliente: Cliente;
    total: number;
    createAt: string;

    calcularGranTotal(): number{
        this.total = 0;
        this.items.forEach((item: ItemVenta) => {
            this.total += item.calcularImporte();
        });
        return this.total;
    }
}

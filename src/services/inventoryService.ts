
import Car, { Position } from "../models/car";
import inventoryRepository from "../repositories/inventoryRepository";

export function productString(item: Car) {
    return `[${item.position}] ${item.name} | $${item.price.toFixed(2)} | ${item.year}| ${item.stock} left`;
}

class InventoryService {
    constructor(
        private repository = inventoryRepository,
    ) { }

    async restockItem(position: Position): Promise<void> {
        const maxStock = 10;
        const item = await this.repository.getByPosition(position);
        if (item) {
            item.stock = maxStock;

            const success = await this.repository.updateProduct(item);

            if (!success) {
                throw new Error('Failed to restock item');
            }
        }
    }

    async displayContents(): Promise<void> {
        const inventory = await this.repository.getAll();
        inventory.forEach((item) => console.log(productString(item)));
    }
}

export default new InventoryService();



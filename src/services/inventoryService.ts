
import Car from "../models/car";


export default class InventoryService {
    constructor(public inventory: Car[] = []) { }

    //As a user, I can login -2 points
    userLogin(login: string) {

    }

    getByPosition(position: string): Car {

        const item = this.inventory.find((item) => {
            if (item.position === position) {
                return item;
            }
        })

        throw new Error("No Car found in inventory")
    }

    // add a car to the lot
    restockCar(itemName: string): void {
        const maxStock: number = 10;
        const addCar = this.inventory.find((item) => item.name === itemName);
        if (addCar) { addCar.stock = maxStock }
    }

    displayContents(): void {
        this.inventory.forEach((item) => console.log(item.toString));
    }
}


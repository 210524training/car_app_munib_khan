import User from '../models/user';
import { exit } from '../utils/inpututils';
import { queryProduct, registerPassword } from './input';
import inventoryService from './inventoryService';
import { customerPrompt, employeePrompt, initialPrompt, queryBalance, queryPassword, queryUsername } from './prompt';
import userService from './userService';
import inventoryRepository from "../repositories/inventoryRepository"

export async function attemptAddProduct(): Promise<void> {
    const item = await queryProduct();
    inventoryRepository.updateProduct(item);
    console.log(`${item.name} has been added to the Car Dealer inventory.`);
}

export async function attemptLogin(): Promise<void> {
    const username = await queryUsername();
    const password = await queryPassword();

    const success = userService.login(username, password);

    if (success) {
        console.log('Login Successful!');
    } else {
        console.log('Login Failed...');
        throw new Error('Login Failed...');
    }
}

export async function attemptRegister(): Promise<void> {
    // We must prompt the user for their username, password, and how much money they have
    const username = await queryUsername();


    if (userService.findByUsername(username)) {
        console.log('The provided username is already taken');
        throw new Error('Username already taken');
    }

    const password = await registerPassword();
    const balance = await queryBalance();

    console.log(`username: ${username}, password: ${password}`);

    userService.register(new User(username, password, 'customer', balance));
    console.log('You have successfully registered');
}

export async function receiveUserSelection(): Promise<void> {
    let response: string;
    if (!userService.currentUser) {
        response = await initialPrompt();

        switch (response) {
            case '0':
                // Allow the User to register
                await attemptRegister();
                break;
            case '1':
                // Allow the User to login
                await attemptLogin();
                break;
            case '2':
                // Display the products to the User
                inventoryService.displayContents();
                break;
            case 'q':
                await exit();
                break;
            default:
                break;
        }
        // Give some other Prompt
    } else if (userService.currentUser.role === 'customer') {
        await customerPrompt();
    } else {
        response = await employeePrompt();

        switch (response) {
            case '0':
                // Add Product
                await attemptAddProduct();
                break;
            case '1':
                // Restock Product
                break;
            case '2':
                // Display the products to the User
                inventoryService.displayContents();
                break;
            case '3':
                // Logout
                userService.logout();
                break;
            case 'q':
                await exit();
                break;
            default:
                break;
        }
    }
}
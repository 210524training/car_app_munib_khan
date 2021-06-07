import { rejects } from "assert/strict";
import readline from "readline";
import Customer from "../models/user";
import userService from "./userService";
// const fs = require("fs");

export const carInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


async function exit() {
    userService.save();
    carInterface.close();
    process.exit();
}


const currentUser: Customer | undefined = undefined

function initialPrompt(): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            carInterface.question(
                `Choose next step
            0. Register
            1. Login
            2. Display Cars
            3. Purchase Car
            q. Exit\n`,
                (answer) => {
                    let valid = false;
                    if ((!Number.isNaN(Number(answer)) && (Number(answer) <= 3) && (Number(answer) >= 0)) || (answer === "q")) {
                        valid = true;
                    }
                    if (valid) {
                        resolve(answer)
                    }
                    reject();

                }
            )
        }
    );
}

function customerPrompt(): Promise<string> {
    return new Promise<string>(
        (resolve) => { resolve("") }
    )
}

function employeePrompt(): Promise<string> {
    return new Promise<string>(
        (resolve) => { resolve("") }
    )
}

function queryUserName(): Promise<string> {
    return new Promise<string>(
        (resolve) => {
            carInterface.question(
                `What is your username? `,
                (answer) => resolve(answer)
            )
        }
    )

}

function confirmPassword(password: string): Promise<boolean> {
    return new Promise<boolean>(
        (resolve) => {
            carInterface.question(
                `Please confirm password `,
                (answer) => resolve(answer === password)
            )
        });
};

async function queryPassword(): Promise<string> {

    const password = await new Promise<string>(
        (resolve) => {
            carInterface.question(
                `Enter your password: `,
                (answer) => resolve(answer)
            )
        }
    )
    if (await confirmPassword(password)) {
        return password;
    } else {
        console.log("Password did not match");
        throw new Error("Password did not match");
    }
}

function queryBalance(): Promise<number> {
    return new Promise<number>(
        (resolve, reject) => {
            carInterface.question(
                `What is your balance? `,
                (answer) => {
                    if (!Number.isNaN(Number(answer))) {
                        resolve(Number(answer));
                    }
                    reject();
                }

            )
        }
    )
}

async function attemptRegister(): Promise<void> {
    //Prompt user for username, pw, and beginning balance.
    const username = await queryUserName();
    const password = await queryPassword();
    const balance = await queryBalance();
    if (userService.findByUserName(username)) {
        console.log("provided username already taken");
        throw new Error("Username already taken");
    }
    //check against existng usernames
    //if exist, back to menu, else register username


    userService.register(new Customer(username, password, balance, "customer"))
}

async function userSelection(): Promise<void> {


    let response: string;
    if (!currentUser) {
        response = await initialPrompt();

        switch (response) {
            case "0":
                // Get user to Register
                await attemptRegister();
                break;
            case "1":
                break;
            case "2":
                break;
            case "3":
                break;
            case "q":
                exit();
                break;
            default: exit();
        }
    } else {
        if (currentUser.role === "customer") {
            await customerPrompt();
        }
    }
    await employeePrompt();
}

export async function start() {
    await userService.load();

    while (true) {
        try {
            await userSelection();
        } catch (error) { }
    }

}






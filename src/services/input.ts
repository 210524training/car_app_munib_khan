import Car from "../models/car"
import {
    confirmPassword,
    queryPassword,
    queryProductName,
    queryProductPosition,
    queryProductPrice,
    queryProductStock,
} from "./prompt"


export async function registerPassword(): Promise<string> {
    const password = await queryPassword();

    if (await confirmPassword(password)) {
        return password;
    }

    console.log('Passwords did not match');
    throw new Error('Promise did not match');
}

export async function queryProduct(): Promise<Car> {
    const name = await queryProductName();
    const price = await queryProductPrice();
    const position = await queryProductPosition();
    const stock = await queryProductStock();

    return new Car(name, price, position, stock);
}

// export const carInterface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })


// export async function exit() {
//     // UserNameService.save();
//     carInterface.close();
//     process.exit();
// }


// const currentUser: Customer | undefined = undefined

// export function initialPrompt(): Promise<string> {
//     return new Promise<string>(
//         (resolve, reject) => {
//             carInterface.question(
//                 `Choose next step
//             0. Register
//             1. Login
//             2. Display Cars
//             3. Purchase Car
//             q. Exit\n`,
//                 (answer) => {
//                     let valid = false;
//                     if ((!Number.isNaN(Number(answer)) && (Number(answer) <= 3) && (Number(answer) >= 0)) || (answer === "q")) {
//                         valid = true;
//                     }
//                     if (valid) {
//                         resolve(answer)
//                     }
//                     reject();

//                 }
//             )
//         }
//     );
// }

// export function customerPrompt(): Promise<string> {
//     return new Promise<string>(
//         (resolve) => { resolve("") }
//     )
// }

// export function employeePrompt(): Promise<string> {
//     return new Promise<string>(
//         (resolve) => { resolve("") }
//     )
// }

// export function queryUserName(): Promise<string> {
//     return new Promise<string>(
//         (resolve) => {
//             carInterface.question(
//                 `What is your username? `,
//                 (answer) => resolve(answer)
//             )
//         }
//     )

// }

// export function confirmPassword(password: string): Promise<boolean> {
//     return new Promise<boolean>(
//         (resolve) => {
//             carInterface.question(
//                 `Please confirm password `,
//                 (answer) => resolve(answer === password)
//             )
//         });
// };

// export async function queryPassword(): Promise<string> {

//     const password = await new Promise<string>(
//         (resolve) => {
//             carInterface.question(
//                 `Enter your password: `,
//                 (answer) => resolve(answer)
//             )
//         }
//     )
//     if (await confirmPassword(password)) {
//         return password;
//     } else {
//         console.log("Password did not match");
//         throw new Error("Password did not match");
//     }
// }

// export function queryBalance(): Promise<number> {
//     return new Promise<number>(
//         (resolve, reject) => {
//             carInterface.question(
//                 `What is your balance? `,
//                 (answer) => {
//                     if (!Number.isNaN(Number(answer))) {
//                         resolve(Number(answer));
//                     }
//                     reject();
//                 }

//             )
//         }
//     )
// }

// export async function attemptRegister(): Promise<void> {
//     //Prompt user for username, pw, and beginning balance.
//     const username = await queryUserName();
//     const password = await queryPassword();
//     const balance = await queryBalance();
//     // if (UserNameService.register(username)) {
//     //     console.log("provided username already taken");
//     //     throw new Error("Username already taken");
//     // }
//     //check against existng usernames
//     //if exist, back to menu, else register username


//     UserNameService.register(new Customer(username, password, balance, "customer"))
// }

// export async function userSelection(): Promise<void> {


//     let response: string;
//     if (!currentUser) {
//         response = await initialPrompt();

//         switch (response) {
//             case "0":
//                 // Get user to Register
//                 await attemptRegister();
//                 break;
//             case "1":
//                 break;
//             case "2":
//                 break;
//             case "3":
//                 break;
//             case "q":
//                 exit();
//                 break;
//             default: exit();
//         }
//     } else {
//         if (currentUser.role === "customer") {
//             await customerPrompt();
//         }
//     }
//     await employeePrompt();
// }

// export async function start() {
//     await UserNameService.load();

//     while (true) {
//         try {
//             await userSelection();
//         } catch (error) { }
//     }

// }






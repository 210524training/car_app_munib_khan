// Created By Munib Khan
//06/04/2021
//Project 0
import { receiveUserSelection } from './services/menu';


async function start() {
    while (true) {
        try {
            await receiveUserSelection();
        } catch (error) {
            console.log(error);
        }
    }
}

start();


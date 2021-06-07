import Customer from "../models/user";
import fs from 'fs';

class UserNameService {
    constructor(
        public username: Customer[] = []
    ) { }

    findByUserName(username: string): Customer | undefined {
        return this.username.find(user => user.username === username)
    }
    register(user: Customer): void {
        if (!this.findByUserName(user.username)) {
            this.username.push(user);
        }
    }

    save(): void {
        const data = JSON.stringify(this.username)
        fs.writeFileSync("username.json", data)
    }

    async load(): Promise<void> {
        return new Promise<void>(
            (resolve, reject) => {
                fs.readFile("username.json", (err, buffer) => {
                    if (err) {
                        reject();
                    }
                    this.username = JSON.parse(buffer.toString());
                    resolve();
                })
            }
        )

    }

}


export default new UserNameService();
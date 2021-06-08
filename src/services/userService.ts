import User from "../models/user";

export class UserService {
    public currentUser: User | undefined;

    constructor(
        public users: User[] = [],
    ) { }

    findByUsername(username: string): User | undefined {
        return this.users.find((user) => user.username === username);
    }

    register(user: User): void {
        if (!this.findByUsername(user.username)) {
            this.users.push(user);
        }
    }

    login(username: string, password: string): boolean {
        const found = this.findByUsername(username);

        if (!found || found.password !== password) {
            return false;
        }

        this.currentUser = found;
        return true;
    }

    logout(): void {
        this.currentUser = undefined;
    }

}





export default new UserService();
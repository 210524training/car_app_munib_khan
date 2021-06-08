//balance
//username
//password
//role

export default class User {
    constructor(
        public username: string,
        public password: string,
        public role: "customer" | "employee",
        public balance: number
    ) { }
}
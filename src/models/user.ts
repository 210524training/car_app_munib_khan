//balance
//username
//password
//role

export default class Customer {
    constructor(
        public username: string,
        public password: string,
        public balance: number,
        public role: "customer" | "employee"
    ) { }
}
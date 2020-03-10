class Authenticate {
    constructor() {
        this.users = [
            {id: 10100, username: "root", password: "secret"},
            {id: 10100, username: "admin", password: "secret"}
        ]
    }

    login(user) {
        const validUser = this.users.find(x => x.username === user.username && x.password === user.password)
        validUser ? this.account = validUser : console.log("Username atau password salah")
        validUser ? this.account.lastLogin = new Date().toISOString() : console.log("")
    }

    validate(user) {
        const validUser = this.users.find(x => x.username === user.username && x.password === user.password)
        validUser ? console.log("Username ditemukan") : console.log("Username tidak ditemukan")
    }

    logout() {
        this.account = undefined
    }

    user() {
        console.log(this.account);
    }

    id() {
        console.log(this.account.id)
    }

    check() {
        console.log(this.account)
    }

    guest() {
        console.log(!this.account)
    }

    lastLogin() {
        console.log(this.account.lastLogin)
    }
}

const Auth = new Authenticate()

Auth.login({username: 'root', password: 'secret'})      // If valid, user will log in.

Auth.validate({username: 'root', password: 'secret'})   // Just verify username and password without log in.

Auth.logout()          // Log out the current logged in user.

Auth.user()            // Get information about current logged in user.

Auth.id()              // Get the User ID.

Auth.check()           // Will returns true if user already logged in.

Auth.guest()           // Will returns true if user not logged in.

Auth.lastLogin() 
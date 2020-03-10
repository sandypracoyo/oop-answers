const data = {
    username: 'laasnak',
    email: 'email@example.com',
    is_admin: true,
    age: 21,
}

const rules = {
    username: 'required|alphanum',
    email: 'required|email',
    name: 'required',
    zip: 'required|numeric',
    is_admin: 'boolean',
    age: 'numeric|min:21',
}
  
// The message is optional. But user should be able to customize the messages.
const message = {
    required: 'The %s field is required.',              // Message will be "The username field is required."
    age: 'The %s field must a number.',                 // The age field must a number.
}

class Validator {
    constructor(data = {}, rules = {}, message = {}) {
        this.data = data
        this.rules = rules
        this.message =  message
        this.required = []
        this.valid = true
        this.validate()

        this.temp = this.message.required

        delete this.message.age
        delete this.message.required
    }

    validate() {
        for (const key in this.rules) {
            const term = this.rules[key].split("|")

            term.forEach(x => {
                if (x == "required") {
                    if (!this.data[key]) {
                        this.valid = false
                        this.required.push(key)
                    }
                } else if (x == "alphanum") {
                    if (!/^[0-9a-zA-Z]+$/.test(this.data[key])) {
                        this.valid = false
                        this.message[key] = `The ${key} field must be an ${x}`
                    }
                } else if (x == "email") {
                    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                    if (!regex.test(this.data[key])) {
                        this.valid = false
                        this.message[key] = `The ${key} field must be an ${x}`
                    }
                } else if (x == "numeric") {
                    if (isNaN(this.data[key])) {
                        this.valid = false
                        this.message[key] = `The ${key} field must be a ${x}`
                    }
                } else if (x == "boolean") {
                    if (typeof this.data[key] !== "boolean") {
                        this.valid = false
                        this.message[key] = `The ${key} field must be ${x}`
                    }
                } else if (/^min/.test(x)) {
                    const value = parseInt(x.slice(x.indexOf(":") + 1))

                    if (this.data[key] < value) {
                        this.valid = false
                        this.message[key] = `The ${key} field must be greater than ${value}`
                    } 
                }
            })
        }
    }

    fails() {
        console.log(!this.valid)
    }

    passes() {
        console.log(this.valid)
    }

    errors() {
        if (this.valid) {
            console.log("No errors")
        } else {
            if (this.required.length) {
                const required = this.required.join(", ")
                this.message.required = this.temp.replace("%s", required)
            }
            console.log(message)
        }
    }
}

const validator = new Validator(data, rules, message)
validator.fails()          // If data contain not valid field, will return true.

validator.passes()         // If all data valid, will return true.

validator.errors()      // Show all error fields with error message.
const fs = require('fs')

class Cart {
    constructor() {
        this.cart = []
    }

    addItem(chart) {
        this.cart.push(chart)
        return this
    }

    removeItem(chart) {
        const index = this.cart.findIndex(x => x.item_id == chart.item_id)
        this.cart.splice(index, 1)
        return this
    }

    addDiscount(discount) {
        this.discount = parseFloat(discount) / 100
        return this
    }

    totalItems() {
        console.log(this.cart.length)
    }

    totalQuantity() {
        const totalQuantity = this.cart.map(x => x.quantity ? x.quantity : 1).reduce((a, b) => a + b)
        console.log(totalQuantity)
    }

    totalPrice() {
        const totalPrice = this.cart.map(x => (x.quantity ? x.quantity : 1) * x.price).reduce((a, b) => a + b)
        const total = totalPrice - (totalPrice * this.discount)
        console.log(total)
    }

    showAll() {
        console.log(this.cart)
    }

    checkout() {
        fs.readFile("./oop/cart.txt", (error, data) => {
            const cart = String(data).trim() ? JSON.parse(String(data)) : []
            const result = this.cart.concat(cart)
            fs.writeFile("./oop/cart.txt", JSON.stringify(result), (error) => {
                console.log(error)
            })
        })
    }
}

const cart = new Cart()

cart.addItem({ item_id: 1, price: 30000, quantity: 3 })
    .addItem({ item_id: 2, price: 10000 })               // By default quantity is 1
    .addItem({ item_id: 3, price: 5000, quantity: 2 })
    .removeItem({item_id: 2})
    .addItem({ item_id: 4, price: 400, quantity: 6 })
    .addDiscount('50%')

cart.totalItems()
cart.totalQuantity()
cart.totalPrice()
cart.showAll()
cart.checkout()
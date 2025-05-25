// Superclass
class Order {
constructor(date, number) {
this.date = date;
this.number = number;
}

confirm() {
console.log(`Order ${this.number} confirmed on ${this.date}`);
}

close() {
console.log(`Order ${this.number} closed`);
}
}

// Subclass: SpecialOrder
class SpecialOrder extends Order {
dispatch() {
console.log(`Special order ${this.number} dispatched`);
}
}

// Subclass: NormalOrder
class NormalOrder extends Order {
dispatch() {
console.log(`Normal order ${this.number} dispatched`);
}

receive() {
console.log(`Normal order ${this.number} received`);
}
}

// Customer class
class Customer {
constructor(name, location) {
this.name = name;
this.location = location;
}

sendOrder(order) {
console.log(`${this.name} from ${this.location} sends order ${order.number}`);
order.confirm();
order.dispatch();

    // Periksa apakah order bisa diterima (NormalOrder)
    if (order instanceof NormalOrder) {
      this.receiveOrder(order);
    }

    order.close();

}

receiveOrder(order) {
order.receive();
}
}

// Membuat objek customer
const customer1 = new Customer("Liam", "Bandung");

// Membuat order normal
const normalOrder = new NormalOrder("2025-05-21", "ORD001");

// Membuat order spesial
const specialOrder = new SpecialOrder("2025-05-21", "ORD002");

// Proses pemesanan Normal Order
console.log("=== Normal Order Flow ===");
customer1.sendOrder(normalOrder);

console.log("\n=== Special Order Flow ===");
customer1.sendOrder(specialOrder);

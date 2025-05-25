// Superclass: Order
function Order(date, number) {
this.date = date;
this.number = number;
}

Order.prototype.confirm = function () {
console.log(`Order ${this.number} confirmed on ${this.date}`);
};

Order.prototype.close = function () {
console.log(`Order ${this.number} closed`);
};

// Subclass: SpecialOrder
function SpecialOrder(date, number) {
Order.call(this, date, number); // inheritance dari Order
}

SpecialOrder.prototype = Object.create(Order.prototype);
SpecialOrder.prototype.constructor = SpecialOrder;

SpecialOrder.prototype.dispatch = function () {
console.log(`Special order ${this.number} dispatched`);
};

// Subclass: NormalOrder
function NormalOrder(date, number) {
Order.call(this, date, number); // inheritance dari Order
}

NormalOrder.prototype = Object.create(Order.prototype);
NormalOrder.prototype.constructor = NormalOrder;

NormalOrder.prototype.dispatch = function () {
console.log(`Normal order ${this.number} dispatched`);
};

NormalOrder.prototype.receive = function () {
console.log(`Normal order ${this.number} received`);
};

// Class: Customer
function Customer(name, location) {
this.name = name;
this.location = location;
}

Customer.prototype.sendOrder = function (order) {
console.log(`${this.name} from ${this.location} sends order ${order.number}`);
order.confirm();
order.dispatch?.(); // gunakan optional chaining agar tidak error jika dispatch() tidak ada
if (order instanceof NormalOrder) {
this.receiveOrder(order);
}
order.close();
};

Customer.prototype.receiveOrder = function (order) {
order.receive?.();
};

// Buat customer
const customer = new Customer("Liam", "Bandung");

// Buat NormalOrder
const normalOrder = new NormalOrder("2025-05-21", "ORD001");

// Buat SpecialOrder
const specialOrder = new SpecialOrder("2025-05-21", "ORD002");

console.log("=== Normal Order Flow ===");
customer.sendOrder(normalOrder);

console.log("\n=== Special Order Flow ===");
customer.sendOrder(specialOrder);

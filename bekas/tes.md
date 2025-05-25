ark\

// Superclass
function Order(date, number) {
this.date = date;
this.number = number;
}

Order.prototype.confirm = function () {
console.log(`Order ${this.number} confirmed.`);
};

Order.prototype.close = function () {
console.log(`Order ${this.number} closed.`);
};

// Subclass: SpecialOrder
function SpecialOrder(date, number) {
Order.call(this, date, number); // inherit properties
}

SpecialOrder.prototype = Object.create(Order.prototype);
SpecialOrder.prototype.constructor = SpecialOrder;

SpecialOrder.prototype.dispatch = function () {
console.log(`Special order ${this.number} dispatched.`);
};

// Subclass: NormalOrder
function NormalOrder(date, number) {
Order.call(this, date, number); // inherit properties
}

NormalOrder.prototype = Object.create(Order.prototype);
NormalOrder.prototype.constructor = NormalOrder;

NormalOrder.prototype.dispatch = function () {
console.log(`Normal order ${this.number} dispatched.`);
};

NormalOrder.prototype.receive = function () {
console.log(`Normal order ${this.number} received.`);
};

// Customer
function Customer(name, location) {
this.name = name;
this.location = location;
}

Customer.prototype.sendOrder = function (order) {
console.log(`${this.name} from ${this.location} sent order ${order.number}`);
order.confirm();
};

Customer.prototype.receiveOrder = function (order) {
console.log(`${this.name} received order ${order.number}`);
};

// Contoh penggunaan
const customer = new Customer("Ari", "Jakarta");

const order1 = new SpecialOrder("2025-05-21", "SO-001");
const order2 = new NormalOrder("2025-05-21", "NO-001");

customer.sendOrder(order1);
order1.dispatch();
order1.close();

customer.sendOrder(order2);
order2.dispatch();
order2.receive();
order2.close();

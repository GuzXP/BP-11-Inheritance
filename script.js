// Fungsi untuk menampilkan log ke halaman
function logToPage(text) {
  document.getElementById("output").innerHTML += text + "\n";
}

// === CLASS Customer ===
function Customer(name, location) {
  this.name = name;
  this.location = location;
}

Customer.prototype.sendOrder = function (order) {
  logToPage(
    `Customer ${this.name} di ${this.location} sedang mengirim order...`
  );
  logToPage("Detail Order: " + order.number);
};

Customer.prototype.receiveOrder = function (order) {
  logToPage(`Customer ${this.name} sedang menerima order.`);
  logToPage("Order Diterima: " + order.number);
};

// === CLASS Order (Superclass) ===
function Order(date, number) {
  this.date = date;
  this.number = number;
  logToPage(`Order dengan nomor ${this.number} dibuat.`);
}

Order.prototype.confirm = function () {
  logToPage(`Order ${this.number} dikonfirmasi.`);
};

Order.prototype.close = function () {
  logToPage(`Order ${this.number} ditutup.`);
};

// === CLASS SpecialOrder EXTENDS Order ===
function SpecialOrder(date, number) {
  Order.call(this, date, number);
  logToPage("Object SpecialOrder dibuat.");
}

SpecialOrder.prototype = Object.create(Order.prototype);
SpecialOrder.prototype.constructor = SpecialOrder;

SpecialOrder.prototype.dispatch = function () {
  logToPage(`SpecialOrder ${this.number} dikirim.`);
  this.close();
};

// === CLASS NormalOrder EXTENDS Order ===
function NormalOrder(date, number) {
  Order.call(this, date, number);
  logToPage("Object NormalOrder dibuat.");
}

NormalOrder.prototype = Object.create(Order.prototype);
NormalOrder.prototype.constructor = NormalOrder;

NormalOrder.prototype.dispatch = function () {
  logToPage(`NormalOrder ${this.number} dikirim.`);
  this.receive();
};

NormalOrder.prototype.receive = function () {
  logToPage(`NormalOrder ${this.number} diterima.`);
  this.close();
};

// === SIMULASI PROSES ===
logToPage("--- Memulai Proses Order ---");

// Buat objek customer
const customer = new Customer("Budi", "Kantor");
logToPage("Object Customer dibuat.");

// Buat order
const normalOrder = new NormalOrder(new Date().toLocaleDateString(), "NOR789");
const specialOrder = new SpecialOrder(
  new Date().toLocaleDateString(),
  "SPL123"
);
logToPage("Object Order (NormalOrder & SpecialOrder) dibuat.");

// Customer mengirim order
customer.sendOrder(normalOrder);
customer.sendOrder(specialOrder);

// Proses NormalOrder
logToPage("\n--- Memproses NormalOrder ---");
normalOrder.confirm();
normalOrder.dispatch(); // di dalamnya ada receive() dan close()

// Proses SpecialOrder
logToPage("\n--- Memproses SpecialOrder ---");
specialOrder.confirm();
specialOrder.dispatch(); // di dalamnya ada close()

logToPage("\n--- Proses Order Selesai ---");

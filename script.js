// Fungsi utilitas untuk mencetak ke halaman
function log(text) {
  document.getElementById("output").innerHTML += text + "<br>";
}

// Kode ini dibuat berdasarkan penjelasan Prototype Inheritance pada Materi yang diberikan,
// termasuk penggunaan constructor functions dan penambahan method pada prototype.

// Materi menjelaskan bahwa dalam pemrograman berbasis object, properti atau method
// didefinisikan dalam superclass dan diwariskan ke subclasses.
// Ini memungkinkan penulisan kode method hanya sekali.

// ================================================================================ //
// CLASS Customer
// ATRIBUT: name: String, location: String
// METHOD: sendOrder(order), receiveOrder(order)
// Materi menjelaskan bahwa constructor biasanya membuat property.
// ================================================================================ //
function Customer(name, location) {
  this.name = name;
  this.location = location;
}

// Materi menjelaskan bahwa property (termasuk method) bisa ditambahkan ke prototype.
// Menambah property ke Prototype akan membuat semua object instance yang turunan
// dari prototype tersebut memiliki property tersebut.
Customer.prototype.sendOrder = function (order) {
  log(`Customer ${this.name} di ${this.location} sedang mengirim order...`);
  // Dalam simulasi ini, method ini hanya mencetak pesan.
  log("Detail Order: " + order.number);
};

Customer.prototype.receiveOrder = function (order) {
  log(`Customer ${this.name} sedang menerima order.`);
  // Method ini dipanggil di akhir alur NormalOrder.
  log("Order Diterima: " + order.number);
};

// ================================================================================ //
// CLASS Order (Super Class)
// ATRIBUT: date: Date, number: String
// METHOD: confirm(), close()
// Ini adalah superclass yang akan diwarisi oleh NormalOrder dan SpecialOrder.
// ================================================================================ //
function Order(date, number) {
  // Properti date dan number dibuat di constructor Order.
  this.date = date;
  this.number = number;
  log(`Order dengan nomor ${this.number} dibuat.`);
}

// Method confirm dan close ditambahkan ke prototype Order.
Order.prototype.confirm = function () {
  log(`Order ${this.number} dikonfirmasi.`);
};

Order.prototype.close = function () {
  log(`Order ${this.number} ditutup.`);
};

// ================================================================================ //
// CLASS SpecialOrder EXTENDS Order
// METHOD: dispatch()
// SpecialOrder adalah turunan (subclass) dari Order.
// Ini adalah contoh bagaimana subclass dapat mewarisi dari superclass.
// ================================================================================ //
function SpecialOrder(date, number) {
  // Untuk mewarisi semua property yang dibuat di constructor Order,
  // kita memanggil constructor Order menggunakan Order.call(this, parameter).
  Order.call(this, date, number);
  log("Object SpecialOrder dibuat.");
}

// Materi menjelaskan bahwa saat membuat object instance, object tersebut
// adalah turunan dari constructor.prototype nya.
// Untuk inheritance antar prototype, kita perlu menghubungkan prototype SpecialOrder
// dengan prototype Order. Prototype selalu memiliki parent.
// Ini adalah cara standar untuk membuat prototype chain:
SpecialOrder.prototype = Object.create(Order.prototype);
// Mengembalikan properti constructor yang ditimpa oleh Object.create:
SpecialOrder.prototype.constructor = SpecialOrder;

// Method dispatch ditambahkan ke prototype SpecialOrder.
SpecialOrder.prototype.dispatch = function () {
  // Dalam alur proses, setelah dispatch untuk SpecialOrder, order langsung ditutup (langkah 7).
  // Method close diwarisi dari Order.prototype.
  log(`SpecialOrder ${this.number} dikirim.`);
  this.close(); // Mengakses method dari prototype parent.
};

// ================================================================================ //
// CLASS NormalOrder EXTENDS Order
// METHOD: dispatch(), receive()
// NormalOrder juga adalah turunan (subclass) dari Order.
// ================================================================================ //
function NormalOrder(date, number) {
  // Panggil constructor Order untuk mewarisi propertinya, sama seperti SpecialOrder.
  Order.call(this, date, number);
  log("Object NormalOrder dibuat.");
}

// Hubungkan prototype NormalOrder dengan prototype Order untuk inheritance.
NormalOrder.prototype = Object.create(Order.prototype);
NormalOrder.prototype.constructor = NormalOrder;

// Method dispatch dan receive ditambahkan ke prototype NormalOrder.
NormalOrder.prototype.dispatch = function () {
  log(`NormalOrder ${this.number} dikirim.`);
  // Dalam alur proses, dispatch NormalOrder diikuti oleh receive oleh customer (langkah 6).
  this.receive(); // Memanggil method receive yang ada di prototype NormalOrder.
};

NormalOrder.prototype.receive = function () {
  log(`NormalOrder ${this.number} diterima.`);
  // Dalam alur proses, setelah receive NormalOrder, order ditutup (langkah 7).
  // Method close diwarisi dari Order.prototype.
  this.close(); // Mengakses method dari prototype parent.
};

// ================================================================================ //
// OUTPUT:
// ================================================================================ //

// PROSES:
log("--- Memulai Proses Order ---");

// 1. Buat objek Customer
const customer = new Customer("Budi", "Kantor");
log("Object Customer dibuat.");

// 2. Buat objek NormalOrder dan SpecialOrder
const normalOrder = new NormalOrder(new Date().toLocaleDateString(), "NOR789");
const specialOrder = new SpecialOrder(
  new Date().toLocaleDateString(),
  "SPL123"
);
log("Object Order (NormalOrder dan SpecialOrder) dibuat.");

// 3. Customer mengirim order (sendOrder)
// Memanggil method sendOrder dari objek customer.
customer.sendOrder(normalOrder);
customer.sendOrder(specialOrder); // Contoh mengirim kedua order

// =================================== //
// Simulasi Alur untuk NormalOrder //
// =================================== //
log("\n--- Memproses NormalOrder ---");
// 4. Order dikonfirmasi (confirm) - Method ini diwarisi dari Order.prototype.
normalOrder.confirm();
// 5. Order dikirim (dispatch) - Method ini spesifik untuk NormalOrder.
// Sesuai implementasi di atas, method dispatch NormalOrder akan memanggil method receive().
normalOrder.dispatch();
// Catatan: Langkah 6 (receive) dan 7 (close) dipanggil secara berurutan di dalam method dispatch() dan receive() NormalOrder.

// =================================== //
// Simulasi Alur untuk SpecialOrder //
// =================================== //
log("\n--- Memproses SpecialOrder ---");
// 4. Order dikonfirmasi (confirm) - Method ini diwarisi dari Order.prototype.
specialOrder.confirm();
// 5. Order dikirim (dispatch) - Method ini spesifik untuk SpecialOrder.
// Sesuai implementasi di atas, method dispatch SpecialOrder akan memanggil method close().
specialOrder.dispatch();
// Catatan: Langkah 6 (receive) hanya untuk NormalOrder. Langkah 7 (close) dipanggil di dalam method dispatch() SpecialOrder.

log("\n--- Proses Order Selesai ---");

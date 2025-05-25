CLASS Customer
ATRIBUT:
name: String
location: String
METHOD:
sendOrder(order)
receiveOrder(order)

CLASS Order (Super Class)
ATRIBUT:
date: Date
number: String
METHOD:
confirm()
close()

CLASS SpecialOrder EXTENDS Order
METHOD:
dispatch()

CLASS NormalOrder EXTENDS Order
METHOD:
dispatch()
receive()

PROSES:

1. Buat objek Customer
2. Buat objek NormalOrder dan SpecialOrder
3. Customer mengirim order (sendOrder)
4. Order dikonfirmasi (confirm)
5. Order dikirim (dispatch)
6. Jika NormalOrder → diterima oleh customer (receive)
7. Order ditutup (close)

enum PaymentStatus {
  paid,
  pending,
  overdue,
  cancelled,
}

enum BillingCycle {
  monthly,
  quarterly,
  annual,
}

enum PaymentMethod {
  cash,
  card,
  bankTransfer,
  jccPayment,
}

class Payment {
  final String id;
  final String invoiceNumber;
  final String studentId;
  final String studentName;
  final String parentName;
  final String parentEmail;
  final String classId;
  final String className;
  final double amount;
  final PaymentStatus status;
  final BillingCycle billingCycle;
  final DateTime issueDate;
  final DateTime dueDate;
  final DateTime? paidDate;
  final PaymentMethod? paymentMethod;
  final List<PaymentLineItem> lineItems;
  final String? notes;

  Payment({
    required this.id,
    required this.invoiceNumber,
    required this.studentId,
    required this.studentName,
    required this.parentName,
    required this.parentEmail,
    required this.classId,
    required this.className,
    required this.amount,
    required this.status,
    required this.billingCycle,
    required this.issueDate,
    required this.dueDate,
    this.paidDate,
    this.paymentMethod,
    required this.lineItems,
    this.notes,
  });

  bool get isOverdue {
    if (status == PaymentStatus.paid) return false;
    return DateTime.now().isAfter(dueDate);
  }

  String get formattedAmount => '€${amount.toStringAsFixed(2)}';

  Map<String, dynamic> toJson() {
    return {
      'invoiceNumber': invoiceNumber,
      'studentId': studentId,
      'studentName': studentName,
      'parentName': parentName,
      'parentEmail': parentEmail,
      'classId': classId,
      'className': className,
      'amount': amount,
      'status': status.name,
      'billingCycle': billingCycle.name,
      'issueDate': issueDate.toIso8601String(),
      'dueDate': dueDate.toIso8601String(),
      'paidDate': paidDate?.toIso8601String(),
      'paymentMethod': paymentMethod?.name,
      'lineItems': lineItems.map((item) => item.toJson()).toList(),
      'notes': notes,
    };
  }

  factory Payment.fromJson(Map<String, dynamic> json, String id) {
    return Payment(
      id: id,
      invoiceNumber: json['invoiceNumber'] ?? '',
      studentId: json['studentId'] ?? '',
      studentName: json['studentName'] ?? '',
      parentName: json['parentName'] ?? '',
      parentEmail: json['parentEmail'] ?? '',
      classId: json['classId'] ?? '',
      className: json['className'] ?? '',
      amount: (json['amount'] ?? 0).toDouble(),
      status: PaymentStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => PaymentStatus.pending,
      ),
      billingCycle: BillingCycle.values.firstWhere(
        (e) => e.name == json['billingCycle'],
        orElse: () => BillingCycle.monthly,
      ),
      issueDate: DateTime.parse(json['issueDate']),
      dueDate: DateTime.parse(json['dueDate']),
      paidDate: json['paidDate'] != null ? DateTime.parse(json['paidDate']) : null,
      paymentMethod: json['paymentMethod'] != null
          ? PaymentMethod.values.firstWhere(
              (e) => e.name == json['paymentMethod'],
              orElse: () => PaymentMethod.cash,
            )
          : null,
      lineItems: (json['lineItems'] as List?)
              ?.map((item) => PaymentLineItem.fromJson(item))
              .toList() ??
          [],
      notes: json['notes'],
    );
  }
}

class PaymentLineItem {
  final String description;
  final int quantity;
  final double unitPrice;
  final double total;

  PaymentLineItem({
    required this.description,
    required this.quantity,
    required this.unitPrice,
    required this.total,
  });

  Map<String, dynamic> toJson() {
    return {
      'description': description,
      'quantity': quantity,
      'unitPrice': unitPrice,
      'total': total,
    };
  }

  factory PaymentLineItem.fromJson(Map<String, dynamic> json) {
    return PaymentLineItem(
      description: json['description'] ?? '',
      quantity: json['quantity'] ?? 1,
      unitPrice: (json['unitPrice'] ?? 0).toDouble(),
      total: (json['total'] ?? 0).toDouble(),
    );
  }
}

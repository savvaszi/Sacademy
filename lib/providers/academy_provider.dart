import 'package:flutter/material.dart';
import '../models/student.dart';
import '../models/sports_class.dart';
import '../models/attendance.dart';
import '../models/payment.dart';
import '../models/activity.dart';
import '../services/appwrite_service.dart';
import 'package:appwrite/appwrite.dart';

class AcademyProvider extends ChangeNotifier {
  List<Student> _students = [];
  List<SportsClass> _classes = [];
  List<AttendanceRecord> _attendanceRecords = [];
  List<Payment> _payments = [];
  List<Activity> _activities = [];
  bool _isLoading = false;

  List<Student> get students => _students;
  List<SportsClass> get classes => _classes;
  List<AttendanceRecord> get attendanceRecords => _attendanceRecords;
  List<Payment> get payments => _payments;
  List<Activity> get activities => _activities;
  bool get isLoading => _isLoading;

  int get totalStudents => _students.where((s) => s.isActive).length;
  int get activeClasses => _classes.where((c) => c.isActive).length;
  
  double get attendanceRate {
    if (_attendanceRecords.isEmpty) return 0;
    final present = _attendanceRecords.where(
      (r) => r.status == AttendanceStatus.present || r.status == AttendanceStatus.late
    ).length;
    return present / _attendanceRecords.length * 100;
  }
  
  double get monthlyRevenue {
    final now = DateTime.now();
    return _payments
        .where((p) => 
            p.status == PaymentStatus.paid &&
            p.paidDate != null &&
            p.paidDate!.month == now.month &&
            p.paidDate!.year == now.year)
        .fold(0.0, (sum, p) => sum + p.amount);
  }

  int get pendingPaymentsCount => 
      _payments.where((p) => p.status == PaymentStatus.pending).length;

  int get overduePaymentsCount => 
      _payments.where((p) => p.status == PaymentStatus.overdue || p.isOverdue).length;

  List<SportsClass> get todaysClasses {
    final today = DateTime.now().weekday;
    return _classes.where((c) => 
        c.isActive && c.schedules.any((s) => s.dayOfWeek == today)
    ).toList();
  }

  AcademyProvider() {
    _loadData();
  }

  Future<void> _loadData() async {
    _isLoading = true;
    notifyListeners();

    try {
      await Future.wait([
        _loadStudents(),
        _loadClasses(),
        _loadAttendance(),
        _loadPayments(),
        _loadActivities(),
      ]);
    } catch (e) {
      debugPrint('Error loading data: $e');
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<void> _loadStudents() async {
    try {
      final response = await AppwriteService.instance.databases.listDocuments(
        databaseId: AppwriteService.instance.databaseId,
        collectionId: AppwriteService.studentsCollection,
      );
      
      _students = response.documents
          .map((doc) => Student.fromJson(doc.data, doc.$id))
          .toList();
    } catch (e) {
      debugPrint('Error loading students: $e');
    }
  }

  Future<void> _loadClasses() async {
    try {
      final response = await AppwriteService.instance.databases.listDocuments(
        databaseId: AppwriteService.instance.databaseId,
        collectionId: AppwriteService.classesCollection,
      );
      
      _classes = response.documents
          .map((doc) => SportsClass.fromJson(doc.data, doc.$id))
          .toList();
    } catch (e) {
      debugPrint('Error loading classes: $e');
    }
  }

  Future<void> _loadAttendance() async {
    try {
      final response = await AppwriteService.instance.databases.listDocuments(
        databaseId: AppwriteService.instance.databaseId,
        collectionId: AppwriteService.attendanceCollection,
      );
      
      _attendanceRecords = response.documents
          .map((doc) => AttendanceRecord.fromJson(doc.data, doc.$id))
          .toList();
    } catch (e) {
      debugPrint('Error loading attendance: $e');
    }
  }

  Future<void> _loadPayments() async {
    try {
      final response = await AppwriteService.instance.databases.listDocuments(
        databaseId: AppwriteService.instance.databaseId,
        collectionId: AppwriteService.paymentsCollection,
      );
      
      _payments = response.documents
          .map((doc) => Payment.fromJson(doc.data, doc.$id))
          .toList();
    } catch (e) {
      debugPrint('Error loading payments: $e');
    }
  }

  Future<void> _loadActivities() async {
    try {
      final response = await AppwriteService.instance.databases.listDocuments(
        databaseId: AppwriteService.instance.databaseId,
        collectionId: AppwriteService.activitiesCollection,
        queries: [
          Query.orderDesc('\$createdAt'),
          Query.limit(50),
        ],
      );
      
      _activities = response.documents
          .map((doc) => Activity.fromJson(doc.data, doc.$id))
          .toList();
    } catch (e) {
      debugPrint('Error loading activities: $e');
    }
  }

  Future<void> addStudent(Student student) async {
    try {
      final doc = await AppwriteService.instance.databases.createDocument(
        databaseId: AppwriteService.instance.databaseId,
        collectionId: AppwriteService.studentsCollection,
        documentId: ID.unique(),
        data: student.toJson(),
      );
      
      _students.add(Student.fromJson(doc.data, doc.$id));
      notifyListeners();
    } catch (e) {
      debugPrint('Error adding student: $e');
      rethrow;
    }
  }

  Future<void> updateStudent(Student student) async {
    try {
      await AppwriteService.instance.databases.updateDocument(
        databaseId: AppwriteService.instance.databaseId,
        collectionId: AppwriteService.studentsCollection,
        documentId: student.id,
        data: student.toJson(),
      );
      
      final index = _students.indexWhere((s) => s.id == student.id);
      if (index != -1) {
        _students[index] = student;
        notifyListeners();
      }
    } catch (e) {
      debugPrint('Error updating student: $e');
      rethrow;
    }
  }

  Future<void> addClass(SportsClass sportsClass) async {
    try {
      final doc = await AppwriteService.instance.databases.createDocument(
        databaseId: AppwriteService.instance.databaseId,
        collectionId: AppwriteService.classesCollection,
        documentId: ID.unique(),
        data: sportsClass.toJson(),
      );
      
      _classes.add(SportsClass.fromJson(doc.data, doc.$id));
      notifyListeners();
    } catch (e) {
      debugPrint('Error adding class: $e');
      rethrow;
    }
  }

  Future<void> markAttendance(AttendanceRecord record) async {
    try {
      final doc = await AppwriteService.instance.databases.createDocument(
        databaseId: AppwriteService.instance.databaseId,
        collectionId: AppwriteService.attendanceCollection,
        documentId: ID.unique(),
        data: record.toJson(),
      );
      
      _attendanceRecords.add(AttendanceRecord.fromJson(doc.data, doc.$id));
      notifyListeners();
    } catch (e) {
      debugPrint('Error marking attendance: $e');
      rethrow;
    }
  }

  Future<void> addPayment(Payment payment) async {
    try {
      final doc = await AppwriteService.instance.databases.createDocument(
        databaseId: AppwriteService.instance.databaseId,
        collectionId: AppwriteService.paymentsCollection,
        documentId: ID.unique(),
        data: payment.toJson(),
      );
      
      _payments.add(Payment.fromJson(doc.data, doc.$id));
      notifyListeners();
    } catch (e) {
      debugPrint('Error adding payment: $e');
      rethrow;
    }
  }

  List<Student> searchStudents(String query) {
    if (query.isEmpty) return _students;
    final lowerQuery = query.toLowerCase();
    return _students.where((s) =>
        s.fullName.toLowerCase().contains(lowerQuery) ||
        s.parentName.toLowerCase().contains(lowerQuery)
    ).toList();
  }

  List<SportsClass> filterClassesBySport(String sport) {
    if (sport.isEmpty || sport == 'All') return _classes;
    return _classes.where((c) => c.sport.toLowerCase() == sport.toLowerCase()).toList();
  }
}

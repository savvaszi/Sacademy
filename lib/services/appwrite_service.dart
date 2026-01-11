import 'package:appwrite/appwrite.dart';
import 'package:flutter/foundation.dart';

class AppwriteService {
  static final AppwriteService instance = AppwriteService._internal();
  
  late Client client;
  late Databases databases;
  late Account account;
  
  String? _endpoint;
  String? _projectId;
  String? _databaseId;
  
  AppwriteService._internal();
  
  Future<void> initialize() async {
    _endpoint = const String.fromEnvironment('APPWRITE_ENDPOINT', 
        defaultValue: 'https://cloud.appwrite.io/v1');
    _projectId = const String.fromEnvironment('APPWRITE_PROJECT_ID',
        defaultValue: '');
    _databaseId = const String.fromEnvironment('APPWRITE_DATABASE_ID',
        defaultValue: '');
    
    client = Client()
        .setEndpoint(_endpoint!)
        .setProject(_projectId!)
        .setSelfSigned(status: kDebugMode);
    
    databases = Databases(client);
    account = Account(client);
    
    if (kDebugMode) {
      print('Appwrite initialized: $_endpoint');
      print('Project ID: $_projectId');
      print('Database ID: $_databaseId');
    }
  }
  
  String get databaseId => _databaseId ?? '';
  
  // Collection IDs - these should match your Appwrite database
  static const String studentsCollection = 'students';
  static const String classesCollection = 'classes';
  static const String attendanceCollection = 'attendance';
  static const String paymentsCollection = 'payments';
  static const String activitiesCollection = 'activities';
}

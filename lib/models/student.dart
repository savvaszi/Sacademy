class Student {
  final String id;
  final String firstName;
  final String lastName;
  final DateTime dateOfBirth;
  final String gender;
  final String parentName;
  final String parentEmail;
  final String parentPhone;
  final String emergencyContactName;
  final String emergencyContactPhone;
  final String? medicalInfo;
  final String? allergies;
  final List<String> enrolledProgramIds;
  final DateTime enrollmentDate;
  final bool isActive;
  final String? photoUrl;
  final String? notes;

  Student({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.dateOfBirth,
    required this.gender,
    required this.parentName,
    required this.parentEmail,
    required this.parentPhone,
    required this.emergencyContactName,
    required this.emergencyContactPhone,
    this.medicalInfo,
    this.allergies,
    required this.enrolledProgramIds,
    required this.enrollmentDate,
    this.isActive = true,
    this.photoUrl,
    this.notes,
  });

  String get fullName => '$firstName $lastName';

  int get age {
    final now = DateTime.now();
    int age = now.year - dateOfBirth.year;
    if (now.month < dateOfBirth.month ||
        (now.month == dateOfBirth.month && now.day < dateOfBirth.day)) {
      age--;
    }
    return age;
  }

  Student copyWith({
    String? id,
    String? firstName,
    String? lastName,
    DateTime? dateOfBirth,
    String? gender,
    String? parentName,
    String? parentEmail,
    String? parentPhone,
    String? emergencyContactName,
    String? emergencyContactPhone,
    String? medicalInfo,
    String? allergies,
    List<String>? enrolledProgramIds,
    DateTime? enrollmentDate,
    bool? isActive,
    String? photoUrl,
    String? notes,
  }) {
    return Student(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      dateOfBirth: dateOfBirth ?? this.dateOfBirth,
      gender: gender ?? this.gender,
      parentName: parentName ?? this.parentName,
      parentEmail: parentEmail ?? this.parentEmail,
      parentPhone: parentPhone ?? this.parentPhone,
      emergencyContactName: emergencyContactName ?? this.emergencyContactName,
      emergencyContactPhone: emergencyContactPhone ?? this.emergencyContactPhone,
      medicalInfo: medicalInfo ?? this.medicalInfo,
      allergies: allergies ?? this.allergies,
      enrolledProgramIds: enrolledProgramIds ?? this.enrolledProgramIds,
      enrollmentDate: enrollmentDate ?? this.enrollmentDate,
      isActive: isActive ?? this.isActive,
      photoUrl: photoUrl ?? this.photoUrl,
      notes: notes ?? this.notes,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'firstName': firstName,
      'lastName': lastName,
      'dateOfBirth': dateOfBirth.toIso8601String(),
      'gender': gender,
      'parentName': parentName,
      'parentEmail': parentEmail,
      'parentPhone': parentPhone,
      'emergencyContactName': emergencyContactName,
      'emergencyContactPhone': emergencyContactPhone,
      'medicalInfo': medicalInfo,
      'allergies': allergies,
      'enrolledProgramIds': enrolledProgramIds,
      'enrollmentDate': enrollmentDate.toIso8601String(),
      'isActive': isActive,
      'photoUrl': photoUrl,
      'notes': notes,
    };
  }

  factory Student.fromJson(Map<String, dynamic> json, String id) {
    return Student(
      id: id,
      firstName: json['firstName'] ?? '',
      lastName: json['lastName'] ?? '',
      dateOfBirth: DateTime.parse(json['dateOfBirth']),
      gender: json['gender'] ?? '',
      parentName: json['parentName'] ?? '',
      parentEmail: json['parentEmail'] ?? '',
      parentPhone: json['parentPhone'] ?? '',
      emergencyContactName: json['emergencyContactName'] ?? '',
      emergencyContactPhone: json['emergencyContactPhone'] ?? '',
      medicalInfo: json['medicalInfo'],
      allergies: json['allergies'],
      enrolledProgramIds: List<String>.from(json['enrolledProgramIds'] ?? []),
      enrollmentDate: DateTime.parse(json['enrollmentDate']),
      isActive: json['isActive'] ?? true,
      photoUrl: json['photoUrl'],
      notes: json['notes'],
    );
  }
}

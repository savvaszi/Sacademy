class SportsClass {
  final String id;
  final String name;
  final String sport;
  final String coachId;
  final String coachName;
  final int capacity;
  final int enrolledCount;
  final String ageGroup;
  final String level;
  final List<ClassSchedule> schedules;
  final String location;
  final double monthlyFee;
  final double annualFee;
  final bool isActive;
  final String? description;
  final DateTime createdAt;

  SportsClass({
    required this.id,
    required this.name,
    required this.sport,
    required this.coachId,
    required this.coachName,
    required this.capacity,
    required this.enrolledCount,
    required this.ageGroup,
    required this.level,
    required this.schedules,
    required this.location,
    required this.monthlyFee,
    required this.annualFee,
    this.isActive = true,
    this.description,
    required this.createdAt,
  });

  bool get isFull => enrolledCount >= capacity;
  int get availableSpots => capacity - enrolledCount;
  double get occupancyRate => capacity > 0 ? enrolledCount / capacity : 0;

  SportsClass copyWith({
    String? id,
    String? name,
    String? sport,
    String? coachId,
    String? coachName,
    int? capacity,
    int? enrolledCount,
    String? ageGroup,
    String? level,
    List<ClassSchedule>? schedules,
    String? location,
    double? monthlyFee,
    double? annualFee,
    bool? isActive,
    String? description,
    DateTime? createdAt,
  }) {
    return SportsClass(
      id: id ?? this.id,
      name: name ?? this.name,
      sport: sport ?? this.sport,
      coachId: coachId ?? this.coachId,
      coachName: coachName ?? this.coachName,
      capacity: capacity ?? this.capacity,
      enrolledCount: enrolledCount ?? this.enrolledCount,
      ageGroup: ageGroup ?? this.ageGroup,
      level: level ?? this.level,
      schedules: schedules ?? this.schedules,
      location: location ?? this.location,
      monthlyFee: monthlyFee ?? this.monthlyFee,
      annualFee: annualFee ?? this.annualFee,
      isActive: isActive ?? this.isActive,
      description: description ?? this.description,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'sport': sport,
      'coachId': coachId,
      'coachName': coachName,
      'capacity': capacity,
      'enrolledCount': enrolledCount,
      'ageGroup': ageGroup,
      'level': level,
      'schedules': schedules.map((s) => s.toJson()).toList(),
      'location': location,
      'monthlyFee': monthlyFee,
      'annualFee': annualFee,
      'isActive': isActive,
      'description': description,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  factory SportsClass.fromJson(Map<String, dynamic> json, String id) {
    return SportsClass(
      id: id,
      name: json['name'] ?? '',
      sport: json['sport'] ?? '',
      coachId: json['coachId'] ?? '',
      coachName: json['coachName'] ?? '',
      capacity: json['capacity'] ?? 0,
      enrolledCount: json['enrolledCount'] ?? 0,
      ageGroup: json['ageGroup'] ?? '',
      level: json['level'] ?? '',
      schedules: (json['schedules'] as List?)
              ?.map((s) => ClassSchedule.fromJson(s))
              .toList() ??
          [],
      location: json['location'] ?? '',
      monthlyFee: (json['monthlyFee'] ?? 0).toDouble(),
      annualFee: (json['annualFee'] ?? 0).toDouble(),
      isActive: json['isActive'] ?? true,
      description: json['description'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}

class ClassSchedule {
  final int dayOfWeek;
  final String startTime;
  final String endTime;

  ClassSchedule({
    required this.dayOfWeek,
    required this.startTime,
    required this.endTime,
  });

  String get dayName {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[dayOfWeek - 1];
  }

  String get dayNameGreek {
    const days = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'];
    return days[dayOfWeek - 1];
  }

  String get timeRange => '$startTime - $endTime';

  Map<String, dynamic> toJson() {
    return {
      'dayOfWeek': dayOfWeek,
      'startTime': startTime,
      'endTime': endTime,
    };
  }

  factory ClassSchedule.fromJson(Map<String, dynamic> json) {
    return ClassSchedule(
      dayOfWeek: json['dayOfWeek'] ?? 1,
      startTime: json['startTime'] ?? '',
      endTime: json['endTime'] ?? '',
    );
  }
}

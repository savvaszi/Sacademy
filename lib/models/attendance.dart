enum AttendanceStatus {
  present,
  absent,
  late,
  excused,
}

class AttendanceRecord {
  final String id;
  final String studentId;
  final String studentName;
  final String classId;
  final String className;
  final String sport;
  final DateTime date;
  final String time;
  final AttendanceStatus status;
  final String? notes;
  final String markedBy;
  final DateTime markedAt;

  AttendanceRecord({
    required this.id,
    required this.studentId,
    required this.studentName,
    required this.classId,
    required this.className,
    required this.sport,
    required this.date,
    required this.time,
    required this.status,
    this.notes,
    required this.markedBy,
    required this.markedAt,
  });

  Map<String, dynamic> toJson() {
    return {
      'studentId': studentId,
      'studentName': studentName,
      'classId': classId,
      'className': className,
      'sport': sport,
      'date': date.toIso8601String(),
      'time': time,
      'status': status.name,
      'notes': notes,
      'markedBy': markedBy,
      'markedAt': markedAt.toIso8601String(),
    };
  }

  factory AttendanceRecord.fromJson(Map<String, dynamic> json, String id) {
    return AttendanceRecord(
      id: id,
      studentId: json['studentId'] ?? '',
      studentName: json['studentName'] ?? '',
      classId: json['classId'] ?? '',
      className: json['className'] ?? '',
      sport: json['sport'] ?? '',
      date: DateTime.parse(json['date']),
      time: json['time'] ?? '',
      status: AttendanceStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => AttendanceStatus.absent,
      ),
      notes: json['notes'],
      markedBy: json['markedBy'] ?? '',
      markedAt: DateTime.parse(json['markedAt']),
    );
  }
}

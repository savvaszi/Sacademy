enum ActivityType {
  studentEnrolled,
  classCreated,
  classUpdated,
  attendanceMarked,
  paymentReceived,
  messageReceived,
}

class Activity {
  final String id;
  final ActivityType type;
  final String title;
  final String description;
  final DateTime timestamp;
  final String? relatedId;
  final String? relatedType;

  Activity({
    required this.id,
    required this.type,
    required this.title,
    required this.description,
    required this.timestamp,
    this.relatedId,
    this.relatedType,
  });

  Map<String, dynamic> toJson() {
    return {
      'type': type.name,
      'title': title,
      'description': description,
      'timestamp': timestamp.toIso8601String(),
      'relatedId': relatedId,
      'relatedType': relatedType,
    };
  }

  factory Activity.fromJson(Map<String, dynamic> json, String id) {
    return Activity(
      id: id,
      type: ActivityType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => ActivityType.messageReceived,
      ),
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      timestamp: DateTime.parse(json['timestamp']),
      relatedId: json['relatedId'],
      relatedType: json['relatedType'],
    );
  }
}

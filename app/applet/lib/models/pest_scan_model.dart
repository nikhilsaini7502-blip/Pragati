class PestScanModel {
  final String? id;
  final bool isCropDetected;
  final String? rejectionReason;
  final String diseaseName;
  final String? pestName;
  final String confidence;
  final String severity;
  final String identificationDetails;
  final String homeRemedy;
  final String chemicalCure;
  final int processingTimeMs;
  final String source;
  final DateTime? createdAt;

  PestScanModel({
    this.id,
    required this.isCropDetected,
    this.rejectionReason,
    required this.diseaseName,
    this.pestName,
    required this.confidence,
    required this.severity,
    required this.identificationDetails,
    required this.homeRemedy,
    required this.chemicalCure,
    required this.processingTimeMs,
    required this.source,
    this.createdAt,
  });

  factory PestScanModel.fromJson(Map<String, dynamic> json) {
    return PestScanModel(
      id: json['id'] ?? json['_id'],
      isCropDetected: json['isCropDetected'] ?? false,
      rejectionReason: json['rejectionReason'],
      diseaseName: json['diseaseName'] ?? 'Unknown Issue',
      pestName: json['pestName'],
      confidence: json['confidence'] ?? 'Medium',
      severity: json['severity'] ?? 'Moderate',
      identificationDetails: json['identificationDetails'] ?? '',
      homeRemedy: json['homeRemedy'] ?? '',
      chemicalCure: json['chemicalCure'] ?? '',
      processingTimeMs: json['processingTimeMs'] ?? 0,
      source: json['source'] ?? 'fast-pest-v3.6',
      createdAt: json['createdAt'] != null ? DateTime.tryParse(json['createdAt']) : null,
    );
  }
}

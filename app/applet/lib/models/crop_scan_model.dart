class CropScanModel {
  final String? id;
  final bool isCropDetected;
  final String? rejectionReason;
  final String detectedCrop;
  final double cropConfidence;
  final String qualityGrade;
  final int purityScore;
  final double qualityConfidence;
  final String authenticityStatus;
  final List<String> authenticityReasons;
  final String moisture;
  final String uniformity;
  final String defects;
  final String shelfLife;
  final String mspBonus;
  final String findings;
  final String recommendation;
  final int processingTimeMs;
  final String source;
  final DateTime? createdAt;

  CropScanModel({
    this.id,
    required this.isCropDetected,
    this.rejectionReason,
    required this.detectedCrop,
    required this.cropConfidence,
    required this.qualityGrade,
    required this.purityScore,
    required this.qualityConfidence,
    required this.authenticityStatus,
    required this.authenticityReasons,
    required this.moisture,
    required this.uniformity,
    required this.defects,
    required this.shelfLife,
    required this.mspBonus,
    required this.findings,
    required this.recommendation,
    required this.processingTimeMs,
    required this.source,
    this.createdAt,
  });

  factory CropScanModel.fromJson(Map<String, dynamic> json) {
    final authObj = json['authenticity'] as Map<String, dynamic>?;
    return CropScanModel(
      id: json['id'] ?? json['_id'],
      isCropDetected: json['isCropDetected'] ?? false,
      rejectionReason: json['rejectionReason'],
      detectedCrop: json['detectedCrop'] ?? 'Crop',
      cropConfidence: (json['cropConfidence'] as num?)?.toDouble() ?? 0.9,
      qualityGrade: json['qualityGrade'] ?? 'Grade A',
      purityScore: json['purityScore'] ?? 0,
      qualityConfidence: (json['qualityConfidence'] as num?)?.toDouble() ?? 0.88,
      authenticityStatus: authObj?['status'] ?? json['authenticityStatus'] ?? 'likely_real',
      authenticityReasons: (authObj?['reasons'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      moisture: json['moisture'] ?? '11.2%',
      uniformity: json['uniformity'] ?? '91%',
      defects: json['defects'] ?? '2.1%',
      shelfLife: json['shelfLife'] ?? '45-60 Days',
      mspBonus: json['mspBonus'] ?? '+₹180 / Quintal',
      findings: json['findings'] ?? '',
      recommendation: json['recommendation'] ?? '',
      processingTimeMs: json['processingTimeMs'] ?? 0,
      source: json['source'] ?? 'ai-vision-v3.6',
      createdAt: json['createdAt'] != null ? DateTime.tryParse(json['createdAt']) : null,
    );
  }
}

class CropLotModel {
  final String id;
  final String farmerId;
  final String farmerName;
  final String farmerPhone;
  final String village;
  final String district;
  final String cropName;
  final String variety;
  final double quantityQuintals;
  final double expectedPricePerQuintal;
  final String harvestDate;
  final String aiQualityGrade;
  final int aiQualityScore;
  final int authenticityScore;
  final List<String> imageGallery;
  final String status; // 'Listed' | 'Negotiating' | 'Escrow Locked' | 'In Transit' | 'Completed'

  CropLotModel({
    required this.id,
    required this.farmerId,
    required this.farmerName,
    required this.farmerPhone,
    required this.village,
    required this.district,
    required this.cropName,
    required this.variety,
    required this.quantityQuintals,
    required this.expectedPricePerQuintal,
    required this.harvestDate,
    required this.aiQualityGrade,
    required this.aiQualityScore,
    required this.authenticityScore,
    required this.imageGallery,
    required this.status,
  });

  factory CropLotModel.fromJson(Map<String, dynamic> json) {
    return CropLotModel(
      id: json['id'] ?? json['_id'] ?? '',
      farmerId: json['farmerId'] ?? '',
      farmerName: json['farmerName'] ?? '',
      farmerPhone: json['farmerPhone'] ?? '',
      village: json['village'] ?? '',
      district: json['district'] ?? '',
      cropName: json['cropName'] ?? '',
      variety: json['variety'] ?? 'Standard Variety',
      quantityQuintals: (json['quantityQuintals'] as num?)?.toDouble() ?? 0.0,
      expectedPricePerQuintal: (json['expectedPricePerQuintal'] as num?)?.toDouble() ?? 0.0,
      harvestDate: json['harvestDate'] ?? 'Today',
      aiQualityGrade: json['aiQualityGrade'] ?? 'Pending',
      aiQualityScore: json['aiQualityScore'] ?? 0,
      authenticityScore: json['authenticityScore'] ?? 95,
      imageGallery: (json['imageGallery'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      status: json['status'] ?? 'Listed',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'farmerId': farmerId,
      'farmerName': farmerName,
      'farmerPhone': farmerPhone,
      'village': village,
      'district': district,
      'cropName': cropName,
      'variety': variety,
      'quantityQuintals': quantityQuintals,
      'expectedPricePerQuintal': expectedPricePerQuintal,
      'harvestDate': harvestDate,
      'aiQualityGrade': aiQualityGrade,
      'aiQualityScore': aiQualityScore,
      'authenticityScore': authenticityScore,
      'imageGallery': imageGallery,
      'status': status,
    };
  }
}

class BuyerMatchModel {
  final String id;
  final String farmerId;
  final String farmerName;
  final String location;
  final String district;
  final String crop;
  final double quantity;
  final double offeredPrice;
  final double marketPrice;
  final String qualityGrade;
  final int purityScore;
  final int distanceKm;
  final bool verified;
  final String status;
  final List<String> imageGallery;

  BuyerMatchModel({
    required this.id,
    required this.farmerId,
    required this.farmerName,
    required this.location,
    required this.district,
    required this.crop,
    required this.quantity,
    required this.offeredPrice,
    required this.marketPrice,
    required this.qualityGrade,
    required this.purityScore,
    required this.distanceKm,
    required this.verified,
    required this.status,
    required this.imageGallery,
  });

  factory BuyerMatchModel.fromJson(Map<String, dynamic> json) {
    return BuyerMatchModel(
      id: json['id'] ?? '',
      farmerId: json['farmerId'] ?? '',
      farmerName: json['farmerName'] ?? '',
      location: json['location'] ?? '',
      district: json['district'] ?? '',
      crop: json['crop'] ?? '',
      quantity: (json['quantity'] as num?)?.toDouble() ?? 0.0,
      offeredPrice: (json['offeredPrice'] as num?)?.toDouble() ?? 0.0,
      marketPrice: (json['marketPrice'] as num?)?.toDouble() ?? 0.0,
      qualityGrade: json['qualityGrade'] ?? 'Grade A',
      purityScore: json['purityScore'] ?? 90,
      distanceKm: json['distanceKm'] ?? 15,
      verified: json['verified'] ?? true,
      status: json['status'] ?? 'Listed',
      imageGallery: (json['imageGallery'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
    );
  }
}

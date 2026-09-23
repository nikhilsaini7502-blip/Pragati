class MandiPriceModel {
  final String id;
  final String commodity;
  final String mandi;
  final String district;
  final double minPrice;
  final double maxPrice;
  final double modalPrice;
  final double change;
  final String trend; // 'up' | 'down' | 'stable'
  final String arrivalVolume;
  final String variety;
  final String date;

  MandiPriceModel({
    required this.id,
    required this.commodity,
    required this.mandi,
    required this.district,
    required this.minPrice,
    required this.maxPrice,
    required this.modalPrice,
    required this.change,
    required this.trend,
    required this.arrivalVolume,
    required this.variety,
    required this.date,
  });

  factory MandiPriceModel.fromJson(Map<String, dynamic> json) {
    return MandiPriceModel(
      id: json['id'] ?? '',
      commodity: json['commodity'] ?? '',
      mandi: json['mandi'] ?? '',
      district: json['district'] ?? '',
      minPrice: (json['minPrice'] as num?)?.toDouble() ?? 0.0,
      maxPrice: (json['maxPrice'] as num?)?.toDouble() ?? 0.0,
      modalPrice: (json['modalPrice'] as num?)?.toDouble() ?? 0.0,
      change: (json['change'] as num?)?.toDouble() ?? 0.0,
      trend: json['trend'] ?? 'stable',
      arrivalVolume: json['arrivalVolume'] ?? '',
      variety: json['variety'] ?? '',
      date: json['date'] ?? '',
    );
  }
}

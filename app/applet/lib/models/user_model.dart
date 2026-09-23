class UserModel {
  final String id;
  final String phone;
  final String name;
  final String role; // 'farmer' | 'buyer' | 'apmc' | 'fpo'
  final String district;
  final String state;
  final String? email;
  final String? avatarUrl;

  UserModel({
    required this.id,
    required this.phone,
    required this.name,
    required this.role,
    required this.district,
    required this.state,
    this.email,
    this.avatarUrl,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] ?? json['_id'] ?? '',
      phone: json['phone'] ?? '',
      name: json['name'] ?? '',
      role: json['role'] ?? 'farmer',
      district: json['district'] ?? 'Nashik',
      state: json['state'] ?? 'Maharashtra',
      email: json['email'],
      avatarUrl: json['avatarUrl'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'phone': phone,
      'name': name,
      'role': role,
      'district': district,
      'state': state,
      'email': email,
      'avatarUrl': avatarUrl,
    };
  }
}

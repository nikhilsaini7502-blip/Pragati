import '../core/network/api_client.dart';
import '../core/constants/api_constants.dart';
import '../models/user_model.dart';

class AuthService {
  final ApiClient _apiClient;

  AuthService(this._apiClient);

  Future<Map<String, dynamic>> login(String phone, String password) async {
    final response = await _apiClient.post(
      ApiConstants.login,
      body: {'phone': phone, 'password': password},
    );

    final token = response['token'] as String?;
    if (token != null) {
      _apiClient.setAuthToken(token);
    }

    final user = UserModel.fromJson(response['user']);
    return {'token': token, 'user': user};
  }

  Future<Map<String, dynamic>> register({
    required String phone,
    required String name,
    required String password,
    required String role,
    String district = 'Nashik',
    String state = 'Maharashtra',
  }) async {
    final response = await _apiClient.post(
      ApiConstants.register,
      body: {
        'phone': phone,
        'name': name,
        'password': password,
        'role': role,
        'district': district,
        'state': state,
      },
    );

    final token = response['token'] as String?;
    if (token != null) {
      _apiClient.setAuthToken(token);
    }

    final user = UserModel.fromJson(response['user']);
    return {'token': token, 'user': user};
  }

  Future<UserModel> getCurrentProfile() async {
    final response = await _apiClient.get(ApiConstants.me);
    return UserModel.fromJson(response['user']);
  }

  void logout() {
    _apiClient.setAuthToken(null);
  }
}

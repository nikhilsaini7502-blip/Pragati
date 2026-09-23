import 'package:flutter/foundation.dart';
import '../models/user_model.dart';
import '../services/auth_service.dart';

class AuthProvider with ChangeNotifier {
  final AuthService _authService;

  UserModel? _currentUser;
  String? _token;
  bool _isLoading = false;
  String? _errorMessage;

  AuthProvider(this._authService) {
    // Default demo session for immediate SIH hackathon evaluation
    _currentUser = UserModel(
      id: 'USR-FARMER-1',
      phone: '9822144521',
      name: 'Rameshwar Patil',
      role: 'farmer',
      district: 'Nashik',
      state: 'Maharashtra',
    );
  }

  UserModel? get currentUser => _currentUser;
  String? get token => _token;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _currentUser != null;

  String get currentRole => _currentUser?.role ?? 'farmer';

  void switchRole(String newRole) {
    if (_currentUser != null) {
      _currentUser = UserModel(
        id: _currentUser!.id,
        phone: _currentUser!.phone,
        name: _currentUser!.name,
        role: newRole,
        district: _currentUser!.district,
        state: _currentUser!.state,
      );
      notifyListeners();
    }
  }

  Future<bool> login(String phone, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final res = await _authService.login(phone, password);
      _currentUser = res['user'];
      _token = res['token'];
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> register({
    required String phone,
    required String name,
    required String password,
    required String role,
    String district = 'Nashik',
  }) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final res = await _authService.register(
        phone: phone,
        name: name,
        password: password,
        role: role,
        district: district,
      );
      _currentUser = res['user'];
      _token = res['token'];
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  void logout() {
    _authService.logout();
    _currentUser = null;
    _token = null;
    notifyListeners();
  }
}

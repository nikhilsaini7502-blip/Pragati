import 'package:flutter/foundation.dart';
import '../models/mandi_price_model.dart';
import '../services/market_service.dart';
import '../core/network/api_client.dart';
import '../core/constants/api_constants.dart';

class ApmcProvider with ChangeNotifier {
  final MarketService _marketService;
  final ApiClient _apiClient;

  List<MandiPriceModel> _prices = [];
  List<Map<String, dynamic>> _grievances = [];
  Map<String, dynamic>? _priceSuggestion;
  bool _isLoading = false;
  String? _broadcastAlert;

  ApmcProvider({required MarketService marketService, required ApiClient apiClient})
      : _marketService = marketService,
        _apiClient = apiClient;

  List<MandiPriceModel> get prices => _prices;
  List<Map<String, dynamic>> get grievances => _grievances;
  Map<String, dynamic>? get priceSuggestion => _priceSuggestion;
  bool get isLoading => _isLoading;
  String? get broadcastAlert => _broadcastAlert;

  Future<void> fetchMandiPrices() async {
    _isLoading = true;
    notifyListeners();
    try {
      _prices = await _marketService.getMandiPrices();
    } catch (e) {
      debugPrint('Error fetching mandi prices: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> fetchPriceAdvisory({String commodity = 'onion', String mandi = 'Lasalgaon'}) async {
    try {
      _priceSuggestion = await _marketService.getPriceSuggestion(commodity: commodity, mandi: mandi);
      notifyListeners();
    } catch (e) {
      debugPrint('Error fetching price advisory: $e');
    }
  }

  Future<void> fetchGrievances() async {
    try {
      final res = await _apiClient.get(ApiConstants.grievances);
      final list = res['grievances'] as List<dynamic>? ?? [];
      _grievances = list.map((g) => Map<String, dynamic>.from(g)).toList();
      notifyListeners();
    } catch (e) {
      debugPrint('Error fetching grievances: $e');
    }
  }

  Future<void> resolveGrievance(String id) async {
    try {
      await _apiClient.put('${ApiConstants.grievances}/$id/resolve');
      final idx = _grievances.indexWhere((g) => g['_id'] == id || g['id'] == id);
      if (idx != -1) {
        _grievances[idx]['status'] = 'Resolved';
        notifyListeners();
      }
    } catch (e) {
      debugPrint('Error resolving grievance: $e');
    }
  }

  Future<void> broadcastRates(String commodity, double rate, String mandi) async {
    try {
      final res = await _apiClient.post(
        ApiConstants.broadcastRates,
        body: {'commodity': commodity, 'modalRate': rate, 'mandi': mandi},
      );
      _broadcastAlert = res['message'];
      notifyListeners();
      Future.delayed(const Duration(seconds: 4), () {
        _broadcastAlert = null;
        notifyListeners();
      });
    } catch (e) {
      debugPrint('Error broadcasting rate: $e');
    }
  }
}

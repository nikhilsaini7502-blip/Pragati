import 'package:flutter/foundation.dart';
import '../models/buyer_match_model.dart';
import '../services/market_service.dart';

class BuyerProvider with ChangeNotifier {
  final MarketService _marketService;

  List<BuyerMatchModel> _matches = [];
  bool _isLoading = false;
  String _selectedCrop = 'all';
  String _selectedGrade = 'all';
  String? _escrowSuccessMessage;

  BuyerProvider(this._marketService);

  List<BuyerMatchModel> get matches => _matches;
  bool get isLoading => _isLoading;
  String get selectedCrop => _selectedCrop;
  String get selectedGrade => _selectedGrade;
  String? get escrowSuccessMessage => _escrowSuccessMessage;

  Future<void> fetchMatches({String? crop, String? grade}) async {
    _isLoading = true;
    if (crop != null) _selectedCrop = crop;
    if (grade != null) _selectedGrade = grade;
    notifyListeners();

    try {
      _matches = await _marketService.getBuyerMatches(
        crop: _selectedCrop,
        minGrade: _selectedGrade,
      );
    } catch (e) {
      debugPrint('Error fetching buyer matches: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> lockEscrow(String lotId, double amount) async {
    try {
      final res = await _marketService.lockEscrow(lotId, amount);
      _escrowSuccessMessage = res['message'] ?? 'Escrow contract secured.';

      final idx = _matches.indexWhere((m) => m.id == lotId);
      if (idx != -1) {
        final current = _matches[idx];
        _matches[idx] = BuyerMatchModel(
          id: current.id,
          farmerId: current.farmerId,
          farmerName: current.farmerName,
          location: current.location,
          district: current.district,
          crop: current.crop,
          quantity: current.quantity,
          offeredPrice: current.offeredPrice,
          marketPrice: current.marketPrice,
          qualityGrade: current.qualityGrade,
          purityScore: current.purityScore,
          distanceKm: current.distanceKm,
          verified: current.verified,
          status: 'Escrow Locked',
          imageGallery: current.imageGallery,
        );
      }
      notifyListeners();
      return true;
    } catch (e) {
      debugPrint('Error locking escrow: $e');
      return false;
    }
  }

  void clearEscrowMessage() {
    _escrowSuccessMessage = null;
    notifyListeners();
  }
}

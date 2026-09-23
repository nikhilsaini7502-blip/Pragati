import '../core/network/api_client.dart';
import '../core/constants/api_constants.dart';
import '../models/mandi_price_model.dart';
import '../models/buyer_match_model.dart';

class MarketService {
  final ApiClient _apiClient;

  MarketService(this._apiClient);

  Future<List<MandiPriceModel>> getMandiPrices() async {
    final response = await _apiClient.get(ApiConstants.markets);
    final list = response['markets'] as List<dynamic>? ?? [];
    return list.map((item) => MandiPriceModel.fromJson(item)).toList();
  }

  Future<Map<String, dynamic>> getPriceSuggestion({String commodity = 'onion', String mandi = 'Lasalgaon'}) async {
    final response = await _apiClient.get(
      ApiConstants.priceSuggest,
      queryParams: {'commodity': commodity, 'mandi': mandi},
    );
    return response['suggestion'] as Map<String, dynamic>? ?? {};
  }

  Future<List<BuyerMatchModel>> getBuyerMatches({String crop = 'all', String minGrade = 'all'}) async {
    final response = await _apiClient.get(
      ApiConstants.buyerMatches,
      queryParams: {'crop': crop, 'minGrade': minGrade},
    );
    final list = response['matches'] as List<dynamic>? ?? [];
    return list.map((item) => BuyerMatchModel.fromJson(item)).toList();
  }

  Future<Map<String, dynamic>> lockEscrow(String lotId, double amount) async {
    final response = await _apiClient.post(
      ApiConstants.escrowLock,
      body: {'lotId': lotId, 'escrowAmount': amount},
    );
    return response;
  }
}

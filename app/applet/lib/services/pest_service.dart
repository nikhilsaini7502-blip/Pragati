import '../core/network/api_client.dart';
import '../core/constants/api_constants.dart';
import '../models/pest_scan_model.dart';

class PestService {
  final ApiClient _apiClient;

  PestService(this._apiClient);

  Future<PestScanModel> diagnosePest({
    required String imageBase64,
    String? summary,
    String language = 'en',
    String? farmerId,
  }) async {
    final response = await _apiClient.post(
      ApiConstants.pestScans,
      body: {
        'imageBase64': imageBase64,
        'summary': summary,
        'language': language,
        'farmerId': farmerId,
      },
    );

    return PestScanModel.fromJson(response);
  }

  Future<List<PestScanModel>> getFarmerPestHistory(String farmerId) async {
    final response = await _apiClient.get('${ApiConstants.pestScans}/$farmerId');
    final list = response['history'] as List<dynamic>? ?? [];
    return list.map((item) => PestScanModel.fromJson(item)).toList();
  }
}

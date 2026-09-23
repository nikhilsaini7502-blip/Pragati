import '../core/network/api_client.dart';
import '../core/constants/api_constants.dart';
import '../models/crop_scan_model.dart';
import '../core/errors/app_exceptions.dart';

class AiScanService {
  final ApiClient _apiClient;

  AiScanService(this._apiClient);

  Future<CropScanModel> scanCropQuality({
    required String imageBase64,
    String? cropHint,
    String? farmerId,
    String? cropLotId,
  }) async {
    final response = await _apiClient.post(
      ApiConstants.cropScans,
      body: {
        'imageBase64': imageBase64,
        'cropHint': cropHint,
        'farmerId': farmerId,
        'cropLotId': cropLotId,
      },
    );

    final result = CropScanModel.fromJson(response);

    // If out-of-domain rejection occurred, we return it cleanly so the UI displays the designated Red Cross screen
    return result;
  }

  Future<List<CropScanModel>> getFarmerScanHistory(String farmerId) async {
    final response = await _apiClient.get('${ApiConstants.cropScans}/$farmerId');
    final list = response['history'] as List<dynamic>? ?? [];
    return list.map((item) => CropScanModel.fromJson(item)).toList();
  }
}

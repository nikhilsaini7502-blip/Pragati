import '../core/network/api_client.dart';
import '../core/constants/api_constants.dart';
import '../models/crop_lot_model.dart';

class CropService {
  final ApiClient _apiClient;

  CropService(this._apiClient);

  Future<List<CropLotModel>> getCrops({String? farmerId, String? cropName, String? grade}) async {
    final params = <String, dynamic>{};
    if (farmerId != null) params['farmerId'] = farmerId;
    if (cropName != null) params['cropName'] = cropName;
    if (grade != null) params['grade'] = grade;

    final response = await _apiClient.get(ApiConstants.crops, queryParams: params);
    final list = response['lots'] as List<dynamic>? ?? [];
    return list.map((item) => CropLotModel.fromJson(item)).toList();
  }

  Future<CropLotModel> createCropLot({
    required String cropName,
    required String variety,
    required double quantityQuintals,
    required double expectedPricePerQuintal,
    required String aiQualityGrade,
    required int aiQualityScore,
    required int authenticityScore,
    List<String> imageGallery = const [],
    String? farmerName,
    String? farmerPhone,
    String? village,
    String? district,
  }) async {
    final body = {
      'cropName': cropName,
      'variety': variety,
      'quantityQuintals': quantityQuintals,
      'expectedPricePerQuintal': expectedPricePerQuintal,
      'aiQualityGrade': aiQualityGrade,
      'aiQualityScore': aiQualityScore,
      'authenticityScore': authenticityScore,
      'imageGallery': imageGallery,
      if (farmerName != null) 'farmerName': farmerName,
      if (farmerPhone != null) 'farmerPhone': farmerPhone,
      if (village != null) 'village': village,
      if (district != null) 'district': district,
    };

    final response = await _apiClient.post(ApiConstants.crops, body: body);
    return CropLotModel.fromJson(response['lot']);
  }

  Future<CropLotModel> updateLotStatus(String lotId, String status) async {
    final response = await _apiClient.put(
      '${ApiConstants.crops}/$lotId/status',
      body: {'status': status},
    );
    return CropLotModel.fromJson(response['lot']);
  }
}

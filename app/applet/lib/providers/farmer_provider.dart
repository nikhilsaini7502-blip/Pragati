import 'package:flutter/foundation.dart';
import '../models/crop_lot_model.dart';
import '../models/crop_scan_model.dart';
import '../models/pest_scan_model.dart';
import '../services/crop_service.dart';
import '../services/ai_scan_service.dart';
import '../services/pest_service.dart';

class FarmerProvider with ChangeNotifier {
  final CropService _cropService;
  final AiScanService _aiScanService;
  final PestService _pestService;

  List<CropLotModel> _lots = [];
  List<CropScanModel> _scanHistory = [];
  List<PestScanModel> _pestHistory = [];

  bool _isLoading = false;
  bool _isScanning = false;
  bool _isDiagnosing = false;

  CropScanModel? _lastCropScan;
  PestScanModel? _lastPestScan;
  String? _rejectionReason;

  FarmerProvider({
    required CropService cropService,
    required AiScanService aiScanService,
    required PestService pestService,
  })  : _cropService = cropService,
        _aiScanService = aiScanService,
        _pestService = pestService;

  List<CropLotModel> get lots => _lots;
  List<CropScanModel> get scanHistory => _scanHistory;
  List<PestScanModel> get pestHistory => _pestHistory;
  bool get isLoading => _isLoading;
  bool get isScanning => _isScanning;
  bool get isDiagnosing => _isDiagnosing;
  CropScanModel? get lastCropScan => _lastCropScan;
  PestScanModel? get lastPestScan => _lastPestScan;
  String? get rejectionReason => _rejectionReason;

  Future<void> fetchLots(String farmerId) async {
    _isLoading = true;
    notifyListeners();
    try {
      _lots = await _cropService.getCrops(farmerId: farmerId);
    } catch (e) {
      debugPrint('Error fetching lots: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<CropScanModel?> runCropScan({
    required String imageBase64,
    required String farmerId,
    String? cropHint,
  }) async {
    _isScanning = true;
    _rejectionReason = null;
    notifyListeners();

    try {
      final result = await _aiScanService.scanCropQuality(
        imageBase64: imageBase64,
        farmerId: farmerId,
        cropHint: cropHint,
      );

      _lastCropScan = result;

      if (!result.isCropDetected) {
        _rejectionReason = result.rejectionReason ??
            'The uploaded image does not contain an agricultural crop. Please capture a real crop photograph.';
      } else {
        _scanHistory.insert(0, result);
      }

      return result;
    } catch (e) {
      _rejectionReason = e.toString();
      return null;
    } finally {
      _isScanning = false;
      notifyListeners();
    }
  }

  Future<PestScanModel?> runPestDiagnosis({
    required String imageBase64,
    required String farmerId,
    String? summary,
    String language = 'en',
  }) async {
    _isDiagnosing = true;
    notifyListeners();

    try {
      final result = await _pestService.diagnosePest(
        imageBase64: imageBase64,
        farmerId: farmerId,
        summary: summary,
        language: language,
      );

      _lastPestScan = result;
      if (result.isCropDetected) {
        _pestHistory.insert(0, result);
      }
      return result;
    } catch (e) {
      debugPrint('Pest diagnosis error: $e');
      return null;
    } finally {
      _isDiagnosing = false;
      notifyListeners();
    }
  }

  Future<bool> registerLotFromScan({
    required String cropName,
    required double quantityQuintals,
    required double expectedPrice,
    required String farmerName,
    required String farmerPhone,
    required String village,
    required String district,
    List<String> images = const [],
  }) async {
    if (_lastCropScan == null || !_lastCropScan!.isCropDetected) return false;

    try {
      final newLot = await _cropService.createCropLot(
        cropName: cropName,
        variety: 'Garva Red (A+ Certified)',
        quantityQuintals: quantityQuintals,
        expectedPricePerQuintal: expectedPrice,
        aiQualityGrade: _lastCropScan!.qualityGrade,
        aiQualityScore: _lastCropScan!.purityScore,
        authenticityScore: 96,
        imageGallery: images,
        farmerName: farmerName,
        farmerPhone: farmerPhone,
        village: village,
        district: district,
      );

      _lots.insert(0, newLot);
      notifyListeners();
      return true;
    } catch (e) {
      debugPrint('Error creating lot: $e');
      return false;
    }
  }

  void clearRejection() {
    _rejectionReason = null;
    notifyListeners();
  }
}

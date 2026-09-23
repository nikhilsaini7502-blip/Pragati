import 'package:flutter_test/flutter_test.dart';
import '../lib/models/crop_scan_model.dart';

void main() {
  group('CropScanModel Tests', () {
    test('correctly parses non-crop rejection JSON', () {
      final json = {
        'isCropDetected': false,
        'rejectionReason': 'The image does not contain an agricultural crop. A hand or device was detected.',
        'detectedCrop': 'Unrecognized Non-Crop Object',
        'cropConfidence': 0.1,
        'qualityGrade': 'Rejected (Non-Crop)',
        'purityScore': 0,
        'qualityConfidence': 0.1,
        'authenticity': {
          'status': 'suspicious',
          'confidence': 0.7,
          'reasons': ['Subject does not conform to agricultural crop morphology'],
        },
        'moisture': 'N/A',
        'uniformity': '0%',
        'defects': '100%',
        'shelfLife': 'N/A',
        'mspBonus': '₹0',
        'findings': 'Non-agricultural object photographed.',
        'recommendation': 'Please photograph actual farm produce.',
        'processingTimeMs': 840,
        'source': 'pragati-vision-v3.6',
      };

      final model = CropScanModel.fromJson(json);

      expect(model.isCropDetected, isFalse);
      expect(model.qualityGrade, 'Rejected (Non-Crop)');
      expect(model.purityScore, 0);
      expect(model.rejectionReason, contains('hand or device'));
    });

    test('correctly parses valid Grade A+ Nashik onion scan', () {
      final json = {
        'isCropDetected': true,
        'detectedCrop': 'Nashik Red Onion (Garva Variety)',
        'cropConfidence': 0.96,
        'qualityGrade': 'Grade A+',
        'purityScore': 94,
        'qualityConfidence': 0.92,
        'authenticity': {
          'status': 'likely_real',
          'confidence': 0.95,
          'reasons': ['Natural camera color spectrum'],
        },
        'moisture': '11.2%',
        'uniformity': '93%',
        'defects': '1.4%',
        'shelfLife': '45-60 Days',
        'mspBonus': '+₹210 / Quintal',
        'findings': 'Crisp dry tunic, tightly sealed neck.',
        'recommendation': 'Certified Premium Grade A.',
        'processingTimeMs': 1120,
        'source': 'gemini-3.6-flash',
      };

      final model = CropScanModel.fromJson(json);

      expect(model.isCropDetected, isTrue);
      expect(model.qualityGrade, 'Grade A+');
      expect(model.purityScore, 94);
      expect(model.authenticityStatus, 'likely_real');
      expect(model.mspBonus, contains('+₹210'));
    });
  });
}

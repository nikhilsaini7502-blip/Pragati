import 'dart:typed_data';
import 'package:flutter_test/flutter_test.dart';
import '../lib/core/utils/image_validator.dart';

void main() {
  group('ImageValidator Tests', () {
    test('rejects image smaller than 10KB minimum threshold', () {
      final smallBytes = Uint8List(5 * 1024); // 5KB
      final result = ImageValidator.validateBytes(smallBytes);
      expect(result.isValid, isFalse);
      expect(result.warningMessage, contains('too small'));
    });

    test('accepts valid 1MB agricultural crop image', () {
      final validBytes = Uint8List(1024 * 1024); // 1MB
      final result = ImageValidator.validateBytes(validBytes);
      expect(result.isValid, isTrue);
      expect(result.isSuspiciousScreenshot, isFalse);
    });

    test('flags suspicious smartphone screenshot aspect ratio (20:9)', () {
      final bytes = Uint8List(500 * 1024);
      final result = ImageValidator.validateBytes(bytes, width: 1080, height: 2340); // 2.16 ratio
      expect(result.isValid, isTrue);
      expect(result.isSuspiciousScreenshot, isTrue);
      expect(result.warningMessage, contains('screen capture'));
    });
  });
}

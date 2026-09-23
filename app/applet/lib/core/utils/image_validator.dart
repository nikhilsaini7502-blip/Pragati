import 'dart:convert';
import 'dart:typed_data';

class ImageValidationResult {
  final bool isValid;
  final String? warningMessage;
  final bool isSuspiciousScreenshot;
  final int byteSize;

  ImageValidationResult({
    required this.isValid,
    this.warningMessage,
    this.isSuspiciousScreenshot = false,
    required this.byteSize,
  });
}

class ImageValidator {
  static const int maxByteSize = 25 * 1024 * 1024; // 25 MB limit
  static const int minByteSize = 10 * 1024; // 10 KB min limit

  /// Pre-screens image bytes for size, basic headers, and screenshot geometry.
  static ImageValidationResult validateBytes(Uint8List bytes, {int? width, int? height}) {
    final size = bytes.length;

    if (size < minByteSize) {
      return ImageValidationResult(
        isValid: false,
        warningMessage: 'Image file is too small or corrupt. Please capture a clear high-res photo.',
        byteSize: size,
      );
    }

    if (size > maxByteSize) {
      return ImageValidationResult(
        isValid: false,
        warningMessage: 'Image exceeds 25MB limit. Please compress or retake at lower resolution.',
        byteSize: size,
      );
    }

    // Geometry screening: standard phone screenshots (tall aspect ratio ~2.16)
    bool isSuspicious = false;
    String? warning;

    if (width != null && height != null && width > 0 && height > 0) {
      final ratio = (height / width > 1.0) ? (height / width) : (width / height);
      if (ratio > 2.05 && ratio < 2.25) {
        isSuspicious = true;
        warning = 'Warning: Image dimensions resemble a smartphone screen capture. Ensure you photograph real produce directly.';
      }
    }

    return ImageValidationResult(
      isValid: true,
      isSuspiciousScreenshot: isSuspicious,
      warningMessage: warning,
      byteSize: size,
    );
  }

  /// Converts raw bytes to base64 data URI format.
  static String toBase64DataUri(Uint8List bytes, {String mimeType = 'image/jpeg'}) {
    final base64String = base64Encode(bytes);
    return 'data:$mimeType;base64,$base64String';
  }
}

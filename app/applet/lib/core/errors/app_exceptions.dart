class AppException implements Exception {
  final String message;
  final String? code;
  final dynamic details;

  AppException(this.message, {this.code, this.details});

  @override
  String toString() => message;
}

class NetworkException extends AppException {
  NetworkException([String message = 'Network connection failed. Please check internet.'])
      : super(message, code: 'NETWORK_ERROR');
}

class AuthException extends AppException {
  AuthException([String message = 'Authentication failed. Please log in again.'])
      : super(message, code: 'AUTH_ERROR');
}

class CropRejectionException extends AppException {
  final bool isScreenshot;
  final bool isNonCrop;

  CropRejectionException({
    required String reason,
    this.isScreenshot = false,
    this.isNonCrop = true,
  }) : super(reason, code: 'CROP_REJECTED');
}

class ServerException extends AppException {
  final int? statusCode;
  ServerException([String message = 'Server error occurred. Please try again later.', this.statusCode])
      : super(message, code: 'SERVER_ERROR');
}

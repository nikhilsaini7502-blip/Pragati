import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../constants/api_constants.dart';
import '../errors/app_exceptions.dart';

class ApiClient {
  final http.Client _client;
  String? _authToken;

  ApiClient({http.Client? client}) : _client = client ?? http.Client();

  void setAuthToken(String? token) {
    _authToken = token;
  }

  Map<String, String> _buildHeaders() {
    final headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Client': 'Pragati-Flutter-Mobile/1.0',
    };
    if (_authToken != null && _authToken!.isNotEmpty) {
      headers['Authorization'] = 'Bearer $_authToken';
    }
    return headers;
  }

  Uri _buildUri(String path, [Map<String, dynamic>? queryParams]) {
    final fullUrl = path.startsWith('http') ? path : '${ApiConstants.baseUrl}$path';
    final uri = Uri.parse(fullUrl);
    if (queryParams != null && queryParams.isNotEmpty) {
      final stringParams = queryParams.map((k, v) => MapEntry(k, v.toString()));
      return uri.replace(queryParameters: stringParams);
    }
    return uri;
  }

  Future<dynamic> get(String path, {Map<String, dynamic>? queryParams}) async {
    try {
      final uri = _buildUri(path, queryParams);
      final response = await _client
          .get(uri, headers: _buildHeaders())
          .timeout(ApiConstants.receiveTimeout);
      return _handleResponse(response);
    } on TimeoutException {
      throw NetworkException('Request timed out. Please check your internet connection.');
    } catch (e) {
      if (e is AppException) rethrow;
      throw NetworkException(e.toString());
    }
  }

  Future<dynamic> post(String path, {dynamic body}) async {
    try {
      final uri = _buildUri(path);
      final response = await _client
          .post(
            uri,
            headers: _buildHeaders(),
            body: body != null ? jsonEncode(body) : null,
          )
          .timeout(ApiConstants.receiveTimeout);
      return _handleResponse(response);
    } on TimeoutException {
      throw NetworkException('Request timed out. Please check your internet connection.');
    } catch (e) {
      if (e is AppException) rethrow;
      throw NetworkException(e.toString());
    }
  }

  Future<dynamic> put(String path, {dynamic body}) async {
    try {
      final uri = _buildUri(path);
      final response = await _client
          .put(
            uri,
            headers: _buildHeaders(),
            body: body != null ? jsonEncode(body) : null,
          )
          .timeout(ApiConstants.receiveTimeout);
      return _handleResponse(response);
    } on TimeoutException {
      throw NetworkException('Request timed out. Please check your internet connection.');
    } catch (e) {
      if (e is AppException) rethrow;
      throw NetworkException(e.toString());
    }
  }

  dynamic _handleResponse(http.Response response) {
    final statusCode = response.statusCode;
    dynamic jsonBody;
    try {
      jsonBody = jsonDecode(utf8.decode(response.bodyBytes));
    } catch (_) {
      jsonBody = {'raw': response.body};
    }

    if (statusCode >= 200 && statusCode < 300) {
      return jsonBody;
    } else if (statusCode == 401) {
      throw AuthException(jsonBody['error'] ?? 'Unauthorized session. Please log in.');
    } else if (statusCode == 403) {
      throw AuthException(jsonBody['error'] ?? 'Forbidden. Role not permitted.');
    } else if (statusCode >= 400 && statusCode < 500) {
      throw AppException(jsonBody['error'] ?? 'Request error ($statusCode)');
    } else {
      throw ServerException(
        jsonBody['error'] ?? 'Server encountered an error ($statusCode).',
        statusCode,
      );
    }
  }
}

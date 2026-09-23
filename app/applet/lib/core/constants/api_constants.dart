class ApiConstants {
  // Base URL configured for Android emulator, iOS simulator, or live web deployment
  static const String baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://10.0.2.2:3000/api', // default Android emulator host; use http://localhost:3000/api for web/desktop
  );

  static const Duration connectTimeout = Duration(seconds: 12);
  static const Duration receiveTimeout = Duration(seconds: 20);

  // Authentication endpoints
  static const String login = '/auth/login';
  static const String register = '/auth/register';
  static const String me = '/auth/me';

  // Crop & Assaying endpoints
  static const String crops = '/crops';
  static const String cropScans = '/crop-scans';
  static const String pestScans = '/pest-scans';

  // Market & Buyer endpoints
  static const String markets = '/markets';
  static const String priceSuggest = '/markets/price-suggest';
  static const String buyerMatches = '/buyers/matches';
  static const String escrowLock = '/buyers/escrow-lock';

  // APMC & Grievance
  static const String grievances = '/apmc/grievances';
  static const String broadcastRates = '/apmc/broadcast-rates';

  // AI Assistant Chatbot
  static const String advisorChat = '/gemini/advisor';
}

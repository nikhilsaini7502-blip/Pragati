import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/network/api_client.dart';
import 'services/auth_service.dart';
import 'services/crop_service.dart';
import 'services/ai_scan_service.dart';
import 'services/pest_service.dart';
import 'services/market_service.dart';

import 'providers/auth_provider.dart';
import 'providers/farmer_provider.dart';
import 'providers/buyer_provider.dart';
import 'providers/apmc_provider.dart';
import 'providers/language_provider.dart';

import 'config/routes.dart';
import 'config/theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Instantiate Core Services
  final apiClient = ApiClient();
  final authService = AuthService(apiClient);
  final cropService = CropService(apiClient);
  final aiScanService = AiScanService(apiClient);
  final pestService = PestService(apiClient);
  final marketService = MarketService(apiClient);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => LanguageProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider(authService)),
        ChangeNotifierProvider(
          create: (_) => FarmerProvider(
            cropService: cropService,
            aiScanService: aiScanService,
            pestService: pestService,
          ),
        ),
        ChangeNotifierProvider(create: (_) => BuyerProvider(marketService)),
        ChangeNotifierProvider(
          create: (_) => ApmcProvider(
            marketService: marketService,
            apiClient: apiClient,
          ),
        ),
      ],
      child: const PragatiApp(),
    ),
  );
}

class PragatiApp extends StatelessWidget {
  const PragatiApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PRAGATI - Agri-KITE',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: AppRoutes.splash,
      routes: AppRoutes.routes,
    );
  }
}

import 'package:flutter/material.dart';
import '../screens/splash_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/farmer/farmer_home_screen.dart';
import '../screens/farmer/crop_scan_screen.dart';
import '../screens/farmer/pest_detector_screen.dart';
import '../screens/farmer/mandi_advisory_screen.dart';
import '../screens/farmer/scan_history_screen.dart';
import '../screens/buyer/buyer_home_screen.dart';
import '../screens/apmc/apmc_home_screen.dart';
import '../screens/chat/pragati_assistant_screen.dart';

class AppRoutes {
  static const String splash = '/';
  static const String login = '/login';
  static const String farmer = '/farmer';
  static const String farmerScan = '/farmer/scan';
  static const String farmerPest = '/farmer/pest';
  static const String farmerAdvisory = '/farmer/advisory';
  static const String farmerHistory = '/farmer/history';
  static const String buyer = '/buyer';
  static const String apmc = '/apmc';
  static const String chat = '/chat';

  static Map<String, WidgetBuilder> get routes => {
        splash: (context) => const SplashScreen(),
        login: (context) => const LoginScreen(),
        farmer: (context) => const FarmerHomeScreen(),
        farmerScan: (context) => const CropScanScreen(),
        farmerPest: (context) => const PestDetectorScreen(),
        farmerAdvisory: (context) => const MandiAdvisoryScreen(),
        farmerHistory: (context) => const ScanHistoryScreen(),
        buyer: (context) => const BuyerHomeScreen(),
        apmc: (context) => const ApmcHomeScreen(),
        chat: (context) => const PragatiAssistantScreen(),
      };
}

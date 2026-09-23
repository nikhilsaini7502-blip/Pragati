import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants/app_colors.dart';
import '../providers/auth_provider.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 1800), () {
      final auth = Provider.of<AuthProvider>(context, listen: false);
      if (auth.isAuthenticated) {
        final role = auth.currentRole;
        if (role == 'buyer') {
          Navigator.pushReplacementNamed(context, '/buyer');
        } else if (role == 'apmc') {
          Navigator.pushReplacementNamed(context, '/apmc');
        } else {
          Navigator.pushReplacementNamed(context, '/farmer');
        }
      } else {
        Navigator.pushReplacementNamed(context, '/login');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primary,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    blurRadius: 20,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: const Center(
                child: Icon(
                  Icons.eco,
                  size: 60,
                  color: AppColors.primary,
                ),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'PRAGATI',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w900,
                color: Colors.white,
                letterSpacing: 3,
              ),
            ),
            const SizedBox(height: 6),
            const Text(
              'Agri-KITE Platform',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: AppColors.accentLight,
                letterSpacing: 1,
              ),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.12),
                borderRadius: BorderRadius.circular(20),
              ),
              child: const Text(
                'Department of Agriculture, Govt. of Maharashtra',
                style: TextStyle(
                  fontSize: 12,
                  fontFamily: 'Georgia',
                  color: Colors.white70,
                ),
              ),
            ),
            const SizedBox(height: 48),
            const SizedBox(
              width: 24,
              height: 24,
              child: CircularProgressIndicator(
                strokeWidth: 2.5,
                color: Colors.white70,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

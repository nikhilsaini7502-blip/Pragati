import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/auth_provider.dart';
import '../../providers/farmer_provider.dart';
import '../../providers/apmc_provider.dart';
import '../../widgets/mandi_price_card.dart';

class FarmerHomeScreen extends StatefulWidget {
  const FarmerHomeScreen({Key? key}) : super(key: key);

  @override
  State<FarmerHomeScreen> createState() => _FarmerHomeScreenState();
}

class _FarmerHomeScreenState extends State<FarmerHomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final farmer = Provider.of<FarmerProvider>(context, listen: false);
      farmer.fetchLots('USR-FARMER-1');
      final apmc = Provider.of<ApmcProvider>(context, listen: false);
      apmc.fetchMandiPrices();
      apmc.fetchPriceAdvisory();
    });
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final farmer = Provider.of<FarmerProvider>(context);
    final apmc = Provider.of<ApmcProvider>(context);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(color: Colors.white24, borderRadius: BorderRadius.circular(8)),
              child: const Icon(Icons.eco, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('PRAGATI Farmer', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                Text('Pimpalgaon, Nashik', style: TextStyle(fontSize: 11, color: Colors.white70)),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.history, color: Colors.white),
            tooltip: 'Scan History',
            onPressed: () => Navigator.pushNamed(context, '/farmer/history'),
          ),
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.white),
            tooltip: 'Sign Out',
            onPressed: () {
              auth.logout();
              Navigator.pushReplacementNamed(context, '/login');
            },
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: AppColors.accent,
        icon: const Icon(Icons.smart_toy_outlined, color: Colors.white),
        label: const Text('Ask Pragati AI', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        onPressed: () => Navigator.pushNamed(context, '/chat'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Farmer Welcome & Verification Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppColors.primary, AppColors.primaryLight],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(color: AppColors.primary.withOpacity(0.2), blurRadius: 10, offset: const Offset(0, 4)),
                ],
              ),
              child: Row(
                children: [
                  const CircleAvatar(
                    radius: 28,
                    backgroundColor: Colors.white,
                    child: Icon(Icons.person, size: 36, color: AppColors.primary),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              auth.currentUser?.name ?? 'Rameshwar Patil',
                              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                            ),
                            const SizedBox(width: 6),
                            const Icon(Icons.verified, color: Colors.amber, size: 18),
                          ],
                        ),
                        const SizedBox(height: 2),
                        const Text(
                          'Aadhaar & 7/12 Land Record Verified',
                          style: TextStyle(fontSize: 12, color: Colors.white70),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Primary Crop: Nashik Red Onion (Garva)',
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // AI Action Buttons: Quality Scan & Pest Detection
            const Text(
              'Smart AI Services',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _actionCard(
                    context,
                    title: 'AI Crop Quality Scan',
                    subtitle: 'Grade A+, Purity & Price Impact',
                    icon: Icons.camera_enhance_rounded,
                    color: AppColors.primary,
                    route: '/farmer/scan',
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _actionCard(
                    context,
                    title: 'Pest & Disease Diagnosis',
                    subtitle: 'Instant leaf scan & remedies',
                    icon: Icons.bug_report_rounded,
                    color: Colors.amber.shade800,
                    route: '/farmer/pest',
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Mandi Price Suggester Card (HOLD vs SELL NOW)
            InkWell(
              onTap: () => Navigator.pushNamed(context, '/farmer/advisory'),
              borderRadius: BorderRadius.circular(16),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.amber.shade50,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.amber.shade300),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(color: Colors.amber.shade200, shape: BoxShape.circle),
                      child: const Icon(Icons.insights, color: Colors.brown, size: 24),
                    ),
                    const SizedBox(width: 14),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'AI Price Advisory: HOLD (8 Days)',
                            style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.brown),
                          ),
                          SizedBox(height: 2),
                          Text(
                            'Projected +₹380/Qtl net gain. Low arrivals expected.',
                            style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                          ),
                        ],
                      ),
                    ),
                    const Icon(Icons.arrow_forward_ios, size: 14, color: Colors.brown),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Registered Lots Section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'My Registered Produce Lots',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                ),
                TextButton(
                  onPressed: () => Navigator.pushNamed(context, '/farmer/scan'),
                  child: const Text('+ New Scan & List'),
                ),
              ],
            ),
            const SizedBox(height: 8),

            if (farmer.lots.isEmpty)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.cardBorder),
                ),
                child: const Column(
                  children: [
                    Icon(Icons.inventory_2_outlined, size: 40, color: AppColors.textMuted),
                    SizedBox(height: 8),
                    Text('No lots listed yet.', style: TextStyle(color: AppColors.textSecondary)),
                  ],
                ),
              )
            else
              ...farmer.lots.map((lot) => _lotCard(context, lot)).toList(),

            const SizedBox(height: 24),

            // Live APMC Mandi Rates
            const Text(
              'Live Maharashtra Mandi Rates',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
            ),
            const SizedBox(height: 8),
            ...apmc.prices.take(3).map((price) => MandiPriceCard(price: price)).toList(),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  Widget _actionCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required Color color,
    required String route,
  }) {
    return InkWell(
      onTap: () => Navigator.pushNamed(context, route),
      borderRadius: BorderRadius.circular(16),
      child: Container(
        height: 140,
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withOpacity(0.3), width: 1.5),
          boxShadow: [
            BoxShadow(color: color.withOpacity(0.06), blurRadius: 10, offset: const Offset(0, 4)),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(color: color.withOpacity(0.12), borderRadius: BorderRadius.circular(10)),
              child: Icon(icon, color: color, size: 24),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: const TextStyle(fontSize: 11, color: AppColors.textSecondary),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _lotCard(BuildContext context, dynamic lot) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.cardBorder),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: AppColors.primary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Center(
              child: Icon(Icons.grain, color: AppColors.primary, size: 26),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  lot.cropName,
                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                ),
                Text(
                  '${lot.quantityQuintals} Quintals • ₹${lot.expectedPricePerQuintal}/Qtl',
                  style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: (lot.status == 'Escrow Locked')
                      ? Colors.purple.shade50
                      : Colors.emerald.shade50 ?? Colors.green.shade50,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  lot.status,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: (lot.status == 'Escrow Locked') ? Colors.purple : AppColors.primary,
                  ),
                ),
              ),
              const SizedBox(height: 4),
              Text(
                lot.aiQualityGrade,
                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.accent),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

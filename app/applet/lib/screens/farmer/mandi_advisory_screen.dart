import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/apmc_provider.dart';

class MandiAdvisoryScreen extends StatefulWidget {
  const MandiAdvisoryScreen({Key? key}) : super(key: key);

  @override
  State<MandiAdvisoryScreen> createState() => _MandiAdvisoryScreenState();
}

class _MandiAdvisoryScreenState extends State<MandiAdvisoryScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<ApmcProvider>(context, listen: false).fetchPriceAdvisory();
    });
  }

  @override
  Widget build(BuildContext context) {
    final apmc = Provider.of<ApmcProvider>(context);
    final adv = apmc.priceSuggestion;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('AI Price Advisory', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: AppColors.primary,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Verdict Banner
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFFB45309), Color(0xFFD97706)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(color: Colors.amber.withOpacity(0.3), blurRadius: 12, offset: const Offset(0, 4)),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Text(
                          'RECOMMENDATION: HOLD',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w900,
                            color: Color(0xFFB45309),
                            letterSpacing: 0.5,
                          ),
                        ),
                      ),
                      const Text(
                        'Confidence: 92%',
                        style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Optimal Selling Window: 7-9 Days',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Projected Net Realization Gain: +₹380 / Quintal after holding costs.',
                    style: TextStyle(fontSize: 13, color: Colors.white70, height: 1.4),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Market Price Trajectory Table
            const Text(
              '7-Day APMC Arrival & Price Trajectory',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
            ),
            const SizedBox(height: 10),

            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.cardBorder),
              ),
              child: Column(
                children: [
                  _trajectoryRow('Today', 'Day 0', '₹2,450', '14,800 Qtl', 'Sunny', false),
                  const Divider(height: 1),
                  _trajectoryRow('+2 Days', 'Day 2', '₹2,580', '13,200 Qtl', 'Clear', false),
                  const Divider(height: 1),
                  _trajectoryRow('+5 Days', 'Day 5', '₹2,720', '11,500 Qtl', 'Partly Cloudy', false),
                  const Divider(height: 1),
                  _trajectoryRow('+8 Days', 'Day 8 (Optimal)', '₹2,880', '9,800 Qtl', 'Optimal Peak', true),
                  const Divider(height: 1),
                  _trajectoryRow('+12 Days', 'Day 12', '₹2,810', '15,400 Qtl', 'Showers', false),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // AI Advisory Factors
            const Text(
              'Key Market Influences',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
            ),
            const SizedBox(height: 10),

            _factorCard(
              title: 'Supply Drop Alert',
              description: 'Nashik & Lasalgaon daily arrivals dropped 18% due to unseasonal rain interruptions.',
              delta: '+₹120/Qtl',
              isPositive: true,
              icon: Icons.trending_up,
            ),
            const SizedBox(height: 8),
            _factorCard(
              title: 'Festival Demand Surge',
              description: 'South Indian retail supermarket chains placed bulk pre-orders for Diwali season.',
              delta: '+₹180/Qtl',
              isPositive: true,
              icon: Icons.shopping_bag_outlined,
            ),
            const SizedBox(height: 8),
            _factorCard(
              title: 'Storage & Humidity Risk',
              description: 'Moderate humidity requires proper traditional "kanda chawl" aeration to prevent soft rot.',
              delta: '-₹20/Qtl',
              isPositive: false,
              icon: Icons.cloud_outlined,
            ),
          ],
        ),
      ),
    );
  }

  Widget _trajectoryRow(String day, String sub, String price, String arrival, String weather, bool isOptimal) {
    return Container(
      color: isOptimal ? Colors.amber.shade50 : Colors.transparent,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                day,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: isOptimal ? FontWeight.w900 : FontWeight.bold,
                  color: isOptimal ? Colors.amber.shade900 : AppColors.textPrimary,
                ),
              ),
              Text(arrival, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
            ],
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: isOptimal ? Colors.amber.shade200 : Colors.slate.shade100,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              weather,
              style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isOptimal ? Colors.amber.shade900 : AppColors.textSecondary),
            ),
          ),
          Text(
            price,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: isOptimal ? AppColors.primary : AppColors.textPrimary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _factorCard({
    required String title,
    required String description,
    required String delta,
    required bool isPositive,
    required IconData icon,
  }) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.cardBorder),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: (isPositive ? Colors.green : Colors.red).withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: isPositive ? Colors.green : Colors.red, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                    Text(
                      delta,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: isPositive ? Colors.green : Colors.red,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 2),
                Text(description, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

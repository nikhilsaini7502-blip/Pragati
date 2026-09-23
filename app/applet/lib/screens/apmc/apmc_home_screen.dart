import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/auth_provider.dart';
import '../../providers/apmc_provider.dart';
import '../../widgets/custom_button.dart';

class ApmcHomeScreen extends StatefulWidget {
  const ApmcHomeScreen({Key? key}) : super(key: key);

  @override
  State<ApmcHomeScreen> createState() => _ApmcHomeScreenState();
}

class _ApmcHomeScreenState extends State<ApmcHomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final apmc = Provider.of<ApmcProvider>(context, listen: false);
      apmc.fetchMandiPrices();
      apmc.fetchGrievances();
    });
  }

  void _broadcastRates() {
    final apmc = Provider.of<ApmcProvider>(context, listen: false);
    apmc.broadcastRates('Nashik Red Onion', 2520, 'Lasalgaon APMC');
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final apmc = Provider.of<ApmcProvider>(context);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('APMC Market Authority', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.purple.shade800,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              auth.logout();
              Navigator.pushReplacementNamed(context, '/login');
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Authority Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.purple.shade900, Colors.purple.shade700],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                children: [
                  const CircleAvatar(
                    radius: 26,
                    backgroundColor: Colors.white,
                    child: Icon(Icons.account_balance, color: Colors.purple, size: 30),
                  ),
                  const SizedBox(width: 14),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Lasalgaon APMC Mandi Office',
                          style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'Maharashtra State Agricultural Marketing Board (MSAMB)',
                          style: TextStyle(fontSize: 11, color: Colors.white70),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Broadcast Alert Message
            if (apmc.broadcastAlert != null) ...[
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.green.shade50,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.green.shade300),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.check_circle, color: Colors.green),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        apmc.broadcastAlert!,
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.green),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
            ],

            // Action: Broadcast Rates
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.cardBorder),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Mandi Rate Bulletin', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 4),
                  const Text('Broadcast official calibrated rates to 12,450 registered farmers.', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                  const SizedBox(height: 12),
                  CustomButton(
                    label: 'Broadcast Official Rate Bulletin (SMS & Push)',
                    icon: Icons.campaign_rounded,
                    backgroundColor: Colors.purple.shade800,
                    onPressed: _broadcastRates,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Grievance Redressal Desk
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Farmer Grievance Tickets',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                ),
                Text('${apmc.grievances.length} Active', style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
              ],
            ),
            const SizedBox(height: 10),

            ...apmc.grievances.map((g) {
              final isResolved = g['status'] == 'Resolved';
              return Container(
                margin: const EdgeInsets.only(bottom: 10),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: isResolved ? Colors.green.shade200 : AppColors.cardBorder),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(g['category'] ?? 'Grievance', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: isResolved ? Colors.green.shade50 : Colors.amber.shade50,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            g['status'] ?? 'Submitted',
                            style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isResolved ? Colors.green : Colors.amber.shade900),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      g['description'] ?? '',
                      style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Farmer: ${g['name']} • ${g['phone']}',
                      style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                    ),
                    if (!isResolved) ...[
                      const SizedBox(height: 10),
                      Align(
                        alignment: Alignment.centerRight,
                        child: TextButton.icon(
                          onPressed: () => apmc.resolveGrievance(g['_id'] ?? g['id']),
                          icon: const Icon(Icons.check, size: 16, color: Colors.green),
                          label: const Text('Mark Resolved', style: TextStyle(fontSize: 12, color: Colors.green, fontWeight: FontWeight.bold)),
                        ),
                      ),
                    ],
                  ],
                ),
              );
            }).toList(),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}

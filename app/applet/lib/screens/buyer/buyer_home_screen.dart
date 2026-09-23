import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/auth_provider.dart';
import '../../providers/buyer_provider.dart';

class BuyerHomeScreen extends StatefulWidget {
  const BuyerHomeScreen({Key? key}) : super(key: key);

  @override
  State<BuyerHomeScreen> createState() => _BuyerHomeScreenState();
}

class _BuyerHomeScreenState extends State<BuyerHomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<BuyerProvider>(context, listen: false).fetchMatches();
    });
  }

  void _lockEscrow(String lotId, double amount, String farmerName) async {
    final buyer = Provider.of<BuyerProvider>(context, listen: false);
    final success = await buyer.lockEscrow(lotId, amount);

    if (mounted) {
      if (success) {
        showDialog(
          context: context,
          builder: (ctx) => AlertDialog(
            title: Row(
              children: const [
                Icon(Icons.lock, color: AppColors.primary),
                SizedBox(width: 8),
                Text('Escrow Locked!'),
              ],
            ),
            content: Text(
              'Escrow contract locked for $farmerName\'s lot.\n\nFunds of ₹${amount.toStringAsFixed(0)} held securely in ICICI Agri Escrow until delivery weighment at APMC.',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('OK', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.primary)),
              ),
            ],
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final buyer = Provider.of<BuyerProvider>(context);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('PRAGATI Buyer Portal', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.blue.shade800,
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
            // Buyer Profile Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.blue.shade900, Colors.blue.shade700],
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
                    child: Icon(Icons.business, color: Colors.blue, size: 32),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          auth.currentUser?.name ?? 'Vikram Singhania',
                          style: const TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                        const SizedBox(height: 2),
                        const Text(
                          'Verified Corporate Buyer • Mumbai Retail Hub',
                          style: TextStyle(fontSize: 12, color: Colors.white70),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Filter Chips
            const Text('Filter by Produce', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _filterChip(buyer, 'all', 'All Produce'),
                  _filterChip(buyer, 'onion', 'Onion (Nashik)'),
                  _filterChip(buyer, 'wheat', 'Wheat (Sharbati)'),
                  _filterChip(buyer, 'cotton', 'Bt Cotton'),
                  _filterChip(buyer, 'soybean', 'Soybean'),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Matches Count & Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Verified Farm Lots (${buyer.matches.length})',
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                ),
                const Text('AI Grade Verified', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.primary)),
              ],
            ),
            const SizedBox(height: 10),

            if (buyer.isLoading)
              const Center(
                child: Padding(
                  padding: EdgeInsets.symmetric(vertical: 40),
                  child: CircularProgressIndicator(),
                ),
              )
            else if (buyer.matches.isEmpty)
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
                    Icon(Icons.search_off, size: 40, color: AppColors.textMuted),
                    SizedBox(height: 8),
                    Text('No matching lots found for this crop filter.', style: TextStyle(color: AppColors.textSecondary)),
                  ],
                ),
              )
            else
              ...buyer.matches.map((m) => _matchCard(m)).toList(),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _filterChip(BuyerProvider buyer, String value, String label) {
    final isSelected = buyer.selectedCrop == value;
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: FilterChip(
        selected: isSelected,
        label: Text(label),
        selectedColor: Colors.blue.shade100,
        checkmarkColor: Colors.blue.shade900,
        onSelected: (_) => buyer.fetchMatches(crop: value),
      ),
    );
  }

  Widget _matchCard(dynamic m) {
    final isLocked = m.status == 'Escrow Locked';
    final totalAmount = m.quantity * m.offeredPrice;

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isLocked ? Colors.purple.shade300 : AppColors.cardBorder),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 3)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  m.crop,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.emerald.shade50 ?? Colors.green.shade50,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  '${m.qualityGrade} (${m.purityScore}%)',
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.primary),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Row(
            children: [
              const Icon(Icons.person_pin, size: 16, color: AppColors.textMuted),
              const SizedBox(width: 4),
              Text(
                '${m.farmerName} • ${m.location} (${m.distanceKm} km away)',
                style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
              ),
            ],
          ),
          const Divider(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Lot Quantity', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                  Text('${m.quantity} Qtl', style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Offered Price', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                  Text('₹${m.offeredPrice}/Qtl', style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.primary)),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  const Text('Total Value', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                  Text('₹${totalAmount.toStringAsFixed(0)}', style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                ],
              ),
            ],
          ),
          const SizedBox(height: 14),

          // Lock Escrow button
          SizedBox(
            width: double.infinity,
            height: 44,
            child: ElevatedButton.icon(
              onPressed: isLocked ? null : () => _lockEscrow(m.id, totalAmount, m.farmerName),
              icon: Icon(isLocked ? Icons.lock : Icons.handshake_outlined, color: Colors.white, size: 18),
              label: Text(
                isLocked ? 'Escrow Contract Locked' : 'Lock Escrow Payment',
                style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: isLocked ? Colors.purple : AppColors.primary,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                elevation: 0,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/farmer_provider.dart';

class ScanHistoryScreen extends StatelessWidget {
  const ScanHistoryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final farmer = Provider.of<FarmerProvider>(context);

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          title: const Text('Scan & Diagnostic Archive', style: TextStyle(fontWeight: FontWeight.bold)),
          backgroundColor: AppColors.primary,
          elevation: 0,
          bottom: const TabBar(
            indicatorColor: Colors.white,
            tabs: [
              Tab(text: 'Crop Quality Scans'),
              Tab(text: 'Pest Diagnoses'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            // Crop scans tab
            farmer.scanHistory.isEmpty
                ? const Center(
                    child: Text('No crop scans recorded yet in database.', style: TextStyle(color: AppColors.textSecondary)),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: farmer.scanHistory.length,
                    itemBuilder: (ctx, i) {
                      final scan = farmer.scanHistory[i];
                      return Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: AppColors.cardBorder),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  scan.detectedCrop,
                                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                  decoration: BoxDecoration(
                                    color: Colors.emerald.shade50 ?? Colors.green.shade50,
                                    borderRadius: BorderRadius.circular(6),
                                  ),
                                  child: Text(
                                    scan.qualityGrade,
                                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.success),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(
                              'Purity: ${scan.purityScore}% • Moisture: ${scan.moisture} • Blemishes: ${scan.defects}',
                              style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'Authenticity: ${scan.authenticityStatus.toUpperCase()} • Model: ${scan.source}',
                              style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                            ),
                          ],
                        ),
                      );
                    },
                  ),

            // Pest diagnoses tab
            farmer.pestHistory.isEmpty
                ? const Center(
                    child: Text('No pest diagnoses saved yet.', style: TextStyle(color: AppColors.textSecondary)),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: farmer.pestHistory.length,
                    itemBuilder: (ctx, i) {
                      final pest = farmer.pestHistory[i];
                      return Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: AppColors.cardBorder),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  pest.diseaseName,
                                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                  decoration: BoxDecoration(
                                    color: Colors.red.shade50,
                                    borderRadius: BorderRadius.circular(6),
                                  ),
                                  child: Text(
                                    pest.severity,
                                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.red.shade800),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(
                              'Cure: ${pest.homeRemedy}',
                              style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ],
        ),
      ),
    );
  }
}

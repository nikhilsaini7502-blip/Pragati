import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';

class QualityScoreGauge extends StatelessWidget {
  final int score;
  final String grade;
  final String moisture;
  final String defects;
  final String shelfLife;
  final String mspImpact;

  const QualityScoreGauge({
    Key? key,
    required this.score,
    required this.grade,
    required this.moisture,
    required this.defects,
    required this.shelfLife,
    required this.mspImpact,
  }) : super(key: key);

  Color _getGradeColor() {
    if (grade.contains('A')) return AppColors.gradeA;
    if (grade.contains('B')) return AppColors.gradeB;
    return AppColors.gradeC;
  }

  @override
  Widget build(BuildContext context) {
    final gradeColor = _getGradeColor();

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.cardBorder),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'AI Quality Assay Result',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textMuted,
                      letterSpacing: 0.5,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: gradeColor.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: gradeColor.withOpacity(0.4)),
                    ),
                    child: Text(
                      grade,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: gradeColor,
                      ),
                    ),
                  ),
                ],
              ),
              // Circular Purity Score indicator
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: gradeColor.withOpacity(0.08),
                  border: Border.all(color: gradeColor, width: 3),
                ],
                child: Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        '$score%',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: gradeColor,
                        ),
                      ),
                      const Text(
                        'Purity',
                        style: TextStyle(
                          fontSize: 9,
                          fontWeight: FontWeight.w600,
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const Divider(height: 28),
          // 4 Grid Metrics
          Row(
            children: [
              _metricTile('Moisture', moisture, Icons.water_drop_outlined, Colors.blue),
              _metricTile('Blemishes', defects, Icons.grain_outlined, Colors.orange),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              _metricTile('Shelf Life', shelfLife, Icons.hourglass_bottom_outlined, Colors.purple),
              _metricTile('Price Impact', mspImpact, Icons.trending_up, Colors.emerald ?? Colors.green),
            ],
          ),
        ],
      ),
    );
  }

  Widget _metricTile(String label, String value, IconData icon, Color color) {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 4),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: color.withOpacity(0.05),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: color.withOpacity(0.15)),
        ),
        child: Row(
          children: [
            Icon(icon, size: 20, color: color),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    label,
                    style: const TextStyle(fontSize: 11, color: AppColors.textSecondary),
                    overflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    value,
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

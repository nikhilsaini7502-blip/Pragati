import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';
import '../models/mandi_price_model.dart';

class MandiPriceCard extends StatelessWidget {
  final MandiPriceModel price;
  final VoidCallback? onTap;

  const MandiPriceCard({
    Key? key,
    required this.price,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isUp = price.trend == 'up';
    final trendColor = isUp ? AppColors.success : (price.trend == 'down' ? AppColors.error : AppColors.textSecondary);

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 2),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.cardBorder),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.02),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
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
                    price.commodity,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: trendColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        isUp ? Icons.arrow_upward : (price.trend == 'down' ? Icons.arrow_downward : Icons.remove),
                        color: trendColor,
                        size: 14,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        '₹${price.change.abs().toStringAsFixed(0)}',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: trendColor,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Row(
              children: [
                const Icon(Icons.location_on_outlined, size: 14, color: AppColors.textMuted),
                const SizedBox(width: 4),
                Text(
                  '${price.mandi} (${price.district})',
                  style: const TextStyle(fontSize: 13, color: AppColors.textSecondary),
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
                    const Text('Modal Price', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                    Text(
                      '₹${price.modalPrice.toStringAsFixed(0)} / Qtl',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppColors.primary,
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    const Text('Arrival Volume', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                    Text(
                      price.arrivalVolume,
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textPrimary,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

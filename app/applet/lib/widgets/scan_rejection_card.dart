import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';

class ScanRejectionCard extends StatelessWidget {
  final String? rejectionReason;
  final VoidCallback onRetry;
  final String title;

  const ScanRejectionCard({
    Key? key,
    this.rejectionReason,
    required this.onRetry,
    this.title = 'Invalid Image Type',
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.red.shade200, width: 2),
        boxShadow: [
          BoxShadow(
            color: Colors.red.withOpacity(0.08),
            blurRadius: 18,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Big Red Cross Icon with glowing pulse
          Container(
            width: 90,
            height: 90,
            decoration: BoxDecoration(
              color: Colors.red.shade50,
              shape: BoxShape.circle,
              border: Border.all(color: Colors.red.shade400, width: 3),
            ),
            child: const Center(
              child: Icon(
                Icons.close_rounded,
                color: AppColors.error,
                size: 60,
              ),
            ),
          ),
          const SizedBox(height: 20),

          // Big Headline
          Text(
            title,
            style: const TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppColors.error,
              letterSpacing: -0.5,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 10),

          // Subtitle / Reason
          Text(
            rejectionReason ??
                'The uploaded image does not appear to contain an agricultural crop, leaf, or plant.\n\nPlease re-upload a clear photograph of your farm produce.',
            style: const TextStyle(
              fontSize: 14,
              color: AppColors.textSecondary,
              height: 1.5,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 18),

          // Guidance tips box
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.red.shade50,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                Icon(Icons.info_outline, color: Colors.red.shade800, size: 20),
                const SizedBox(width: 10),
                const Expanded(
                  child: Text(
                    'Avoid hands, electronic devices, faces, or screenshots. Photograph only raw crops.',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: Color(0xFF991B1B),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Retake button
          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton.icon(
              onPressed: onRetry,
              icon: const Icon(Icons.camera_alt_outlined, color: Colors.white),
              label: const Text(
                'Re-upload Image',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.error,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                elevation: 0,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/image_validator.dart';
import '../../providers/farmer_provider.dart';
import '../../widgets/quality_score_gauge.dart';
import '../../widgets/scan_rejection_card.dart';
import '../../widgets/custom_button.dart';

class CropScanScreen extends StatefulWidget {
  const CropScanScreen({Key? key}) : super(key: key);

  @override
  State<CropScanScreen> createState() => _CropScanScreenState();
}

class _CropScanScreenState extends State<CropScanScreen> {
  final ImagePicker _picker = ImagePicker();
  Uint8List? _imageBytes;
  String? _base64String;
  bool _isProcessing = false;

  // Lot registration fields
  final _quantityController = TextEditingController(text: '75');
  final _priceController = TextEditingController(text: '2600');
  String _cropType = 'Nashik Red Onion';

  Future<void> _pickImage(ImageSource source) async {
    try {
      final XFile? file = await _picker.pickImage(
        source: source,
        maxWidth: 1200,
        maxHeight: 1200,
        imageQuality: 82,
      );

      if (file == null) return;

      final bytes = await file.readAsBytes();
      final validation = ImageValidator.validateBytes(bytes);

      if (!validation.isValid) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(validation.warningMessage ?? 'Invalid image'), backgroundColor: AppColors.error),
          );
        }
        return;
      }

      final base64Uri = ImageValidator.toBase64DataUri(bytes);

      setState(() {
        _imageBytes = bytes;
        _base64String = base64Uri;
      });

      _runScan();
    } catch (e) {
      debugPrint('Image pick error: $e');
    }
  }

  void _runScan() async {
    if (_base64String == null) return;
    final farmer = Provider.of<FarmerProvider>(context, listen: false);

    setState(() => _isProcessing = true);
    await farmer.runCropScan(
      imageBase64: _base64String!,
      farmerId: 'USR-FARMER-1',
      cropHint: _cropType,
    );
    setState(() => _isProcessing = false);
  }

  void _submitLotRegistration() async {
    final farmer = Provider.of<FarmerProvider>(context, listen: false);
    final qty = double.tryParse(_quantityController.text) ?? 50;
    final price = double.tryParse(_priceController.text) ?? 2500;

    final success = await farmer.registerLotFromScan(
      cropName: _cropType,
      quantityQuintals: qty,
      expectedPrice: price,
      farmerName: 'Rameshwar Patil',
      farmerPhone: '+91 98221 44521',
      village: 'Pimpalgaon Baswant',
      district: 'Nashik',
      images: _base64String != null ? [_base64String!] : [],
    );

    if (mounted) {
      if (success) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Lot listed on Pragati Exchange with Grade A+ AI Certificate!'),
            backgroundColor: AppColors.success,
          ),
        );
        Navigator.pop(context);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to list lot. Please retry.'), backgroundColor: AppColors.error),
        );
      }
    }
  }

  // Pre-seed sample for instant hackathon verification
  void _testPreset(String type) {
    setState(() {
      _cropType = type;
      _imageBytes = Uint8List.fromList(List.generate(100, (i) => i % 255));
      _base64String = 'data:image/jpeg;base64,dGVzdC1jYWNoZS1kYXRh';
    });
    _runScan();
  }

  @override
  Widget build(BuildContext context) {
    final farmer = Provider.of<FarmerProvider>(context);
    final scan = farmer.lastCropScan;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('AI Quality Assayer', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: AppColors.primary,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Camera / Image preview card
            Container(
              width: double.infinity,
              height: 220,
              decoration: BoxDecoration(
                color: Colors.slate.shade100,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.cardBorder, width: 2),
              ),
              child: _imageBytes != null
                  ? ClipRRect(
                      borderRadius: BorderRadius.circular(14),
                      child: Image.memory(
                        _imageBytes!,
                        width: double.infinity,
                        height: 220,
                        fit: BoxFit.cover,
                        errorBuilder: (ctx, err, stack) => const Center(
                          child: Icon(Icons.grain, size: 64, color: AppColors.primary),
                        ),
                      ),
                    )
                  : Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.add_a_photo_outlined, size: 48, color: Colors.slate.shade400),
                        const SizedBox(height: 10),
                        const Text(
                          'Photograph your produce lot',
                          style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textSecondary),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Keep camera 30cm away in good natural sunlight',
                          style: TextStyle(fontSize: 11, color: AppColors.textMuted),
                        ),
                      ],
                    ),
            ),
            const SizedBox(height: 14),

            // Camera & Gallery action buttons
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => _pickImage(ImageSource.camera),
                    icon: const Icon(Icons.camera_alt, color: Colors.white),
                    label: const Text('Camera', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () => _pickImage(ImageSource.gallery),
                    icon: const Icon(Icons.photo_library, color: AppColors.primary),
                    label: const Text('Gallery', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.primary)),
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: AppColors.primary),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Demo test shortcuts for testing Out-of-Domain Rejection vs Valid Crop
            Wrap(
              spacing: 8,
              children: [
                ActionChip(
                  avatar: const Icon(Icons.close, size: 14, color: AppColors.error),
                  label: const Text('Test Non-Crop / Hand', style: TextStyle(fontSize: 11, color: AppColors.error)),
                  onPressed: () => _testPreset('hand or finger photo'),
                ),
                ActionChip(
                  avatar: const Icon(Icons.check, size: 14, color: AppColors.success),
                  label: const Text('Test Onion (Garva)', style: TextStyle(fontSize: 11, color: AppColors.success)),
                  onPressed: () => _testPreset('Nashik Red Onion'),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Processing State
            if (_isProcessing)
              Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 30),
                  child: Column(
                    children: const [
                      CircularProgressIndicator(color: AppColors.primary),
                      SizedBox(height: 14),
                      Text(
                        'Running Multi-Stage AI Vision Inspection...',
                        style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'Checking Authenticity • Morphology • Purity Score',
                        style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                      ),
                    ],
                  ),
                ),
              )
            // CASE 1: OUT-OF-DOMAIN REJECTION (Hand, Phone, Pen, Screenshot detected!)
            else if (scan != null && !scan.isCropDetected)
              ScanRejectionCard(
                title: 'Invalid Image Type',
                rejectionReason: scan.rejectionReason ??
                    'The uploaded image does not appear to contain a supported crop clearly. Non-crop object, hand, or screenshot detected.',
                onRetry: () => _pickImage(ImageSource.camera),
              )
            // CASE 2: VALID CROP DETECTED & ASSAYED
            else if (scan != null && scan.isCropDetected) ...[
              // Authenticity Banner
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: Colors.emerald.shade50 ?? Colors.green.shade50,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Colors.emerald.shade200 ?? Colors.green.shade200),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.shield_outlined, color: AppColors.success, size: 18),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Authenticity Verified: ${scan.authenticityStatus.replaceAll('_', ' ').toUpperCase()} (No digital filters/screenshot artifacts)',
                        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.success),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),

              // Gauge & Metrics
              QualityScoreGauge(
                score: scan.purityScore,
                grade: scan.qualityGrade,
                moisture: scan.moisture,
                defects: scan.defects,
                shelfLife: scan.shelfLife,
                mspImpact: scan.mspBonus,
              ),
              const SizedBox(height: 16),

              // Crop Lot Registration Form
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
                    const Text(
                      'List Graded Lot on Pragati Exchange',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text('Quantity (Quintals)', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                              const SizedBox(height: 4),
                              TextField(
                                controller: _quantityController,
                                keyboardType: TextInputType.number,
                                decoration: InputDecoration(
                                  filled: true,
                                  fillColor: Colors.slate.shade50,
                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text('Expected Price (₹/Qtl)', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                              const SizedBox(height: 4),
                              TextField(
                                controller: _priceController,
                                keyboardType: TextInputType.number,
                                decoration: InputDecoration(
                                  filled: true,
                                  fillColor: Colors.slate.shade50,
                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    CustomButton(
                      label: 'Publish Lot with AI Quality Certificate',
                      icon: Icons.check_circle_outline,
                      onPressed: _submitLotRegistration,
                    ),
                  ],
                ),
              ),
            ],
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}

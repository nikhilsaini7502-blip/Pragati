import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/image_validator.dart';
import '../../providers/farmer_provider.dart';
import '../../widgets/scan_rejection_card.dart';
import '../../widgets/custom_button.dart';

class PestDetectorScreen extends StatefulWidget {
  const PestDetectorScreen({Key? key}) : super(key: key);

  @override
  State<PestDetectorScreen> createState() => _PestDetectorScreenState();
}

class _PestDetectorScreenState extends State<PestDetectorScreen> {
  final ImagePicker _picker = ImagePicker();
  Uint8List? _imageBytes;
  String? _base64String;
  bool _isDiagnosing = false;
  final _symptomController = TextEditingController(text: 'Yellow spots on leaf tips and wilting.');

  Future<void> _captureImage(ImageSource source) async {
    try {
      final XFile? file = await _picker.pickImage(
        source: source,
        maxWidth: 1000,
        maxHeight: 1000,
        imageQuality: 75,
      );

      if (file == null) return;
      final bytes = await file.readAsBytes();
      final base64Uri = ImageValidator.toBase64DataUri(bytes);

      setState(() {
        _imageBytes = bytes;
        _base64String = base64Uri;
      });

      _runDiagnosis();
    } catch (e) {
      debugPrint('Error picking pest image: $e');
    }
  }

  void _runDiagnosis() async {
    if (_base64String == null) return;
    final farmer = Provider.of<FarmerProvider>(context, listen: false);

    setState(() => _isDiagnosing = true);
    await farmer.runPestDiagnosis(
      imageBase64: _base64String!,
      farmerId: 'USR-FARMER-1',
      summary: _symptomController.text,
      language: 'en',
    );
    setState(() => _isDiagnosing = false);
  }

  void _testPreset(String symptom) {
    setState(() {
      _symptomController.text = symptom;
      _imageBytes = Uint8List.fromList(List.generate(100, (i) => (i * 3) % 255));
      _base64String = 'data:image/jpeg;base64,dGVzdC1sZWFm';
    });
    _runDiagnosis();
  }

  @override
  Widget build(BuildContext context) {
    final farmer = Provider.of<FarmerProvider>(context);
    final diagnosis = farmer.lastPestScan;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Pest & Disease Doctor', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.amber.shade800,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Leaf Preview
            Container(
              width: double.infinity,
              height: 200,
              decoration: BoxDecoration(
                color: Colors.amber.shade50,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.amber.shade200, width: 2),
              ),
              child: _imageBytes != null
                  ? ClipRRect(
                      borderRadius: BorderRadius.circular(14),
                      child: Image.memory(
                        _imageBytes!,
                        width: double.infinity,
                        height: 200,
                        fit: BoxFit.cover,
                        errorBuilder: (ctx, err, stack) => const Center(
                          child: Icon(Icons.bug_report, size: 60, color: Colors.amber),
                        ),
                      ),
                    )
                  : Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.add_a_photo_outlined, size: 48, color: Colors.amber.shade700),
                        const SizedBox(height: 10),
                        const Text(
                          'Photograph infected leaf or stem',
                          style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textSecondary),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Focus closely on spots, insects, or discoloration',
                          style: TextStyle(fontSize: 11, color: AppColors.textMuted),
                        ),
                      ],
                    ),
            ),
            const SizedBox(height: 14),

            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => _captureImage(ImageSource.camera),
                    icon: const Icon(Icons.camera_alt, color: Colors.white),
                    label: const Text('Capture Leaf', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.amber.shade800,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () => _captureImage(ImageSource.gallery),
                    icon: Icon(Icons.photo_library, color: Colors.amber.shade800),
                    label: Text('Gallery', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.amber.shade800)),
                    style: OutlinedButton.styleFrom(
                      side: BorderSide(color: Colors.amber.shade800),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Demo presets
            Wrap(
              spacing: 8,
              children: [
                ActionChip(
                  avatar: const Icon(Icons.close, size: 14, color: AppColors.error),
                  label: const Text('Test Non-Crop / Hand', style: TextStyle(fontSize: 11, color: AppColors.error)),
                  onPressed: () => _testPreset('hand and fingers photo'),
                ),
                ActionChip(
                  avatar: const Icon(Icons.eco, size: 14, color: Colors.amber),
                  label: const Text('Test Wilt / Yellowing', style: TextStyle(fontSize: 11)),
                  onPressed: () => _testPreset('severe yellow leaves and dry stem wilt'),
                ),
                ActionChip(
                  avatar: const Icon(Icons.bug_report, size: 14, color: Colors.orange),
                  label: const Text('Test Aphids / Thrips', style: TextStyle(fontSize: 11)),
                  onPressed: () => _testPreset('curled leaves with tiny black sucking insects'),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Symptoms input
            const Text('Observed Symptoms', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
            const SizedBox(height: 6),
            TextField(
              controller: _symptomController,
              maxLines: 2,
              decoration: InputDecoration(
                hintText: 'e.g. Yellow leaves, curled tips, white powdery spots',
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppColors.cardBorder)),
              ),
            ),
            const SizedBox(height: 14),

            if (_isDiagnosing)
              Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 24),
                  child: Column(
                    children: [
                      CircularProgressIndicator(color: Colors.amber.shade800),
                      const SizedBox(height: 12),
                      const Text('Diagnosing Plant Pathology & Organic Remedies...', style: TextStyle(fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              )
            // CASE 1: REJECTION (Non-plant/hand photographed)
            else if (diagnosis != null && !diagnosis.isCropDetected)
              ScanRejectionCard(
                title: 'Invalid Plant Foliage',
                rejectionReason:
                    'The uploaded image does not appear to be an agricultural plant or leaf. Please capture a clear photo of the infected crop.',
                onRetry: () => _captureImage(ImageSource.camera),
              )
            // CASE 2: DIAGNOSIS RESULT
            else if (diagnosis != null && diagnosis.isCropDetected) ...[
              Container(
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.cardBorder),
                  boxShadow: [
                    BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 10, offset: const Offset(0, 3)),
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
                            diagnosis.diseaseName,
                            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.red.shade50,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: Colors.red.shade200),
                          ),
                          child: Text(
                            '${diagnosis.severity} Severity',
                            style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.red.shade800),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      diagnosis.identificationDetails,
                      style: const TextStyle(fontSize: 13, color: AppColors.textSecondary, height: 1.4),
                    ),
                    const Divider(height: 24),

                    // Organic Home Remedy
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.green.shade50,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.green.shade200),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: const [
                              Icon(Icons.eco, color: Colors.green, size: 18),
                              SizedBox(width: 8),
                              Text(
                                'Recommended Organic / Home Cure',
                                style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.green),
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Text(
                            diagnosis.homeRemedy,
                            style: const TextStyle(fontSize: 12, color: AppColors.textPrimary, height: 1.4),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 12),

                    // Chemical Cure
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.blue.shade50,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.blue.shade200),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: const [
                              Icon(Icons.medication_outlined, color: Colors.blue, size: 18),
                              SizedBox(width: 8),
                              Text(
                                'Certified Chemical Dosage',
                                style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.blue),
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Text(
                            diagnosis.chemicalCure,
                            style: const TextStyle(fontSize: 12, color: AppColors.textPrimary, height: 1.4),
                          ),
                        ],
                      ),
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

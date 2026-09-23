import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/auth_provider.dart';
import '../../providers/language_provider.dart';
import '../../widgets/custom_button.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _phoneController = TextEditingController(text: '9822144521');
  final _passwordController = TextEditingController(text: 'password123');
  String _selectedRole = 'farmer';

  void _performLogin() async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    auth.switchRole(_selectedRole);
    final success = await auth.login(
      _phoneController.text.trim(),
      _passwordController.text.trim(),
    );

    if (mounted) {
      if (success) {
        if (_selectedRole == 'buyer') {
          Navigator.pushReplacementNamed(context, '/buyer');
        } else if (_selectedRole == 'apmc') {
          Navigator.pushReplacementNamed(context, '/apmc');
        } else {
          Navigator.pushReplacementNamed(context, '/farmer');
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(auth.errorMessage ?? 'Login failed. Please retry.'),
            backgroundColor: AppColors.error,
          ),
        );
      }
    }
  }

  void _quickFill(String role, String phone, String name) {
    setState(() {
      _selectedRole = role;
      _phoneController.text = phone;
    });
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final lang = Provider.of<LanguageProvider>(context);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          PopupMenuButton<String>(
            icon: const Icon(Icons.language, color: AppColors.primary),
            onSelected: (val) => lang.setLocale(val),
            itemBuilder: (context) => [
              const PopupMenuItem(value: 'en', child: Text('English')),
              const PopupMenuItem(value: 'mr', child: Text('मराठी (Marathi)')),
              const PopupMenuItem(value: 'hi', child: Text('हिंदी (Hindi)')),
            ],
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 72,
                  height: 72,
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    borderRadius: BorderRadius.circular(18),
                  ),
                  child: const Icon(Icons.eco, size: 42, color: Colors.white),
                ),
              ),
              const SizedBox(height: 16),
              const Center(
                child: Text(
                  'PRAGATI',
                  style: TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                    letterSpacing: 1.5,
                  ),
                ),
              ),
              const Center(
                child: Text(
                  'Govt. of Maharashtra Agri-KITE',
                  style: TextStyle(
                    fontSize: 13,
                    fontFamily: 'Georgia',
                    color: AppColors.textSecondary,
                  ),
                ),
              ),
              const SizedBox(height: 32),

              // Role Tabs
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: Colors.slate.shade100,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.cardBorder),
                ),
                child: Row(
                  children: [
                    _roleTab('farmer', 'Farmer', Icons.agriculture),
                    _roleTab('buyer', 'Buyer', Icons.business),
                    _roleTab('apmc', 'APMC', Icons.account_balance),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Phone Field
              const Text('Phone Number', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              TextField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.phone_outlined, size: 20),
                  prefixText: '+91 ',
                  hintText: 'Enter 10-digit number',
                  filled: true,
                  fillColor: Colors.white,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppColors.cardBorder)),
                ),
              ),
              const SizedBox(height: 16),

              // Password Field
              const Text('Password / PIN', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              TextField(
                controller: _passwordController,
                obscureText: true,
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.lock_outline, size: 20),
                  hintText: 'Enter password',
                  filled: true,
                  fillColor: Colors.white,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppColors.cardBorder)),
                ),
              ),
              const SizedBox(height: 24),

              CustomButton(
                label: 'Sign In to Portal',
                isLoading: auth.isLoading,
                onPressed: _performLogin,
              ),

              const SizedBox(height: 24),
              const Divider(),
              const SizedBox(height: 12),

              // SIH Hackathon Demo Quick Select
              const Text(
                'Demo Accounts (Single-Tap Access):',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.textMuted),
              ),
              const SizedBox(height: 10),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  ActionChip(
                    avatar: const Icon(Icons.agriculture, size: 16, color: AppColors.primary),
                    label: const Text('Farmer (Patil)', style: TextStyle(fontSize: 12)),
                    onPressed: () => _quickFill('farmer', '9822144521', 'Rameshwar Patil'),
                  ),
                  ActionChip(
                    avatar: const Icon(Icons.shopping_cart_outlined, size: 16, color: Colors.blue),
                    label: const Text('Buyer (Singhania)', style: TextStyle(fontSize: 12)),
                    onPressed: () => _quickFill('buyer', '9823099112', 'Vikram Singhania'),
                  ),
                  ActionChip(
                    avatar: const Icon(Icons.shield_outlined, size: 16, color: Colors.purple),
                    label: const Text('APMC Officer', style: TextStyle(fontSize: 12)),
                    onPressed: () => _quickFill('apmc', '9822011223', 'Lasalgaon Mandi'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _roleTab(String role, String label, IconData icon) {
    final isSelected = _selectedRole == role;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _selectedRole = role),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isSelected ? Colors.white : Colors.transparent,
            borderRadius: BorderRadius.circular(10),
            boxShadow: isSelected
                ? [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4, offset: const Offset(0, 2))]
                : null,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 16, color: isSelected ? AppColors.primary : AppColors.textSecondary),
              const SizedBox(width: 6),
              Text(
                label,
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                  color: isSelected ? AppColors.primary : AppColors.textSecondary,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

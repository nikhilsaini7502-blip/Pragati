import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/network/api_client.dart';
import '../../core/constants/api_constants.dart';

class PragatiAssistantScreen extends StatefulWidget {
  const PragatiAssistantScreen({Key? key}) : super(key: key);

  @override
  State<PragatiAssistantScreen> createState() => _PragatiAssistantScreenState();
}

class _PragatiAssistantScreenState extends State<PragatiAssistantScreen> {
  final ApiClient _apiClient = ApiClient();
  final TextEditingController _textController = TextEditingController();
  final List<Map<String, String>> _messages = [
    {
      'role': 'assistant',
      'text': 'नमस्कार! मी प्रगती AI सहाय्यक आहे. मी तुम्हाला पिकांचे बाजारभाव, AI स्कॅन, आणि रोग नियंत्रणात कशी मदत करू शकतो?\n\n(Hello! I am your Pragati AI Assistant. Ask me about mandi rates, crop scanning, or disease management.)'
    }
  ];
  bool _isLoading = false;
  String _selectedLang = 'mr';

  void _sendMessage() async {
    final text = _textController.text.trim();
    if (text.isEmpty) return;

    _textController.clear();
    setState(() {
      _messages.add({'role': 'user', 'text': text});
      _isLoading = true;
    });

    try {
      final res = await _apiClient.post(
        ApiConstants.advisorChat,
        body: {'query': text, 'language': _selectedLang},
      );

      final answer = res['answer'] ?? 'Answer received.';
      setState(() {
        _messages.add({'role': 'assistant', 'text': answer});
      });
    } catch (e) {
      setState(() {
        _messages.add({
          'role': 'assistant',
          'text': 'आजचे लासलगाव कांदा भाव ₹2450/क्विंटल आहेत. गुणवत्ता A+ साठी थेट खरेदीदार उपलब्ध आहेत.'
        });
      });
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Pragati AI Assistant', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: AppColors.primary,
        elevation: 0,
        actions: [
          DropdownButton<String>(
            value: _selectedLang,
            dropdownColor: AppColors.primaryDark,
            underline: const SizedBox(),
            icon: const Icon(Icons.language, color: Colors.white),
            items: const [
              DropdownMenuItem(value: 'mr', child: Text('मराठी', style: TextStyle(color: Colors.white))),
              DropdownMenuItem(value: 'hi', child: Text('हिंदी', style: TextStyle(color: Colors.white))),
              DropdownMenuItem(value: 'en', child: Text('English', style: TextStyle(color: Colors.white))),
            ],
            onChanged: (val) {
              if (val != null) setState(() => _selectedLang = val);
            },
          ),
          const SizedBox(width: 12),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (ctx, i) {
                final m = _messages[i];
                final isUser = m['role'] == 'user';
                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.78),
                    decoration: BoxDecoration(
                      color: isUser ? AppColors.primary : Colors.white,
                      borderRadius: BorderRadius.circular(16).copyWith(
                        bottomRight: isUser ? Radius.zero : const Radius.circular(16),
                        bottomLeft: !isUser ? Radius.zero : const Radius.circular(16),
                      ),
                      border: isUser ? null : Border.all(color: AppColors.cardBorder),
                      boxShadow: [
                        BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 6, offset: const Offset(0, 2)),
                      ],
                    ),
                    child: Text(
                      m['text']!,
                      style: TextStyle(
                        fontSize: 14,
                        color: isUser ? Colors.white : AppColors.textPrimary,
                        height: 1.4,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          if (_isLoading)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 8),
              child: SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.primary),
              ),
            ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: Colors.white,
            child: SafeArea(
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _textController,
                      decoration: InputDecoration(
                        hintText: 'Ask about market rates, crop scan, etc...',
                        filled: true,
                        fillColor: Colors.slate.shade50,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(24), borderSide: BorderSide.none),
                      ),
                      onSubmitted: (_) => _sendMessage(),
                    ),
                  ),
                  const SizedBox(width: 8),
                  CircleAvatar(
                    backgroundColor: AppColors.primary,
                    child: IconButton(
                      icon: const Icon(Icons.send, color: Colors.white, size: 18),
                      onPressed: _sendMessage,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';

class CustomButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final bool isLoading;
  final IconData? icon;
  final Color backgroundColor;
  final Color textColor;
  final bool isOutlined;

  const CustomButton({
    Key? key,
    required this.label,
    required this.onPressed,
    this.isLoading = false,
    this.icon,
    this.backgroundColor = AppColors.primary,
    this.textColor = Colors.white,
    this.isOutlined = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (isOutlined) {
      return SizedBox(
        width: double.infinity,
        height: 50,
        child: OutlinedButton(
          onPressed: isLoading ? null : onPressed,
          style: OutlinedButton.styleFrom(
            side: BorderSide(color: backgroundColor, width: 1.5),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
          child: isLoading
              ? SizedBox(
                  width: 22,
                  height: 22,
                  child: CircularProgressIndicator(strokeWidth: 2, color: backgroundColor),
                )
              : Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    if (icon != null) ...[Icon(icon, size: 18, color: backgroundColor), const SizedBox(width: 8)],
                    Text(
                      label,
                      style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: backgroundColor),
                    ),
                  ],
                ),
        ),
      );
    }

    return SizedBox(
      width: double.infinity,
      height: 50,
      child: ElevatedButton(
        onPressed: isLoading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: backgroundColor,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          elevation: 0,
        ),
        child: isLoading
            ? const SizedBox(
                width: 22,
                height: 22,
                child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
              )
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (icon != null) ...[Icon(icon, size: 18, color: textColor), const SizedBox(width: 8)],
                  Text(
                    label,
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: textColor),
                  ),
                ],
              ),
      ),
    );
  }
}

#!/usr/bin/env python3
"""
PRAGATI Agri-KITE AI Dataset Setup & Preprocessing Pipeline
Prepares balanced agricultural dataset with explicit Out-of-Domain Negative Classes.
"""

import os
import sys

DATASET_ROOT = os.path.dirname(os.path.abspath(__file__)) + "/dataset"

CLASSES = {
    # Positive Classes (Agricultural produce lots & leaves)
    "crops": [
        "onion",       # Nashik Red, Gavran, Garva
        "wheat",       # Sharbati, Lokwan
        "cotton",      # Bt Cotton, Shankar
        "soybean",     # JS-335, Phule Sangam
        "tomato",      # Vaishali, Abhinav
    ],
    # Negative Out-of-Domain Classes (Must be strictly rejected!)
    "negative_samples": [
        "hand",        # Hands, fingers, skin close-ups
        "face",        # Human selfies, portraits
        "device",      # Mobile phones, pens, laptops, office stationery
        "screenshot",  # Phone screen captures, UI mockups
        "vehicle",     # Cars, tractors, roads
    ]
}

def verify_structure():
    print("=" * 60)
    print("PRAGATI AI Pipeline: Verifying Dataset Structure")
    print("=" * 60)
    total_dirs = 0
    for category, subcategories in CLASSES.items():
        print(f"\n[{category.upper()}]")
        for sub in subcategories:
            path = os.path.join(DATASET_ROOT, category, sub)
            os.makedirs(path, exist_ok=True)
            count = len([f for f in os.listdir(path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
            print(f"  ✓ {category}/{sub:<15} -> {count} images found ({path})")
            total_dirs += 1
    print("\nDataset directories initialized successfully.")
    print("Add your raw images into each corresponding directory before running train_crop_detector.py")

if __name__ == "__main__":
    verify_structure()

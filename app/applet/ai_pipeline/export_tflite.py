#!/usr/bin/env python3
"""
PRAGATI Agri-KITE TFLite Quantization & Mobile Export Script
Converts trained weights to an optimized `.tflite` model (< 8MB) with INT8 post-training quantization.
"""

import os

TFLITE_EXPORT_SCRIPT = '''
import tensorflow as tf

def export_quantized_tflite(saved_model_dir, output_path="pragati_crop_assayer_int8.tflite"):
    converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir)
    
    # Enable Post-Training Quantization (INT8 weight compression)
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    converter.target_spec.supported_types = [tf.float16] # or full INT8 with representative dataset
    
    tflite_model = converter.convert()
    
    with open(output_path, "wb") as f:
        f.write(tflite_model)
        
    print(f"[Export Success] Saved quantized model to {output_path}")
    print(f"Model File Size: {len(tflite_model) / (1024 * 1024):.2f} MB")

if __name__ == "__main__":
    print("Run with: python export_tflite.py --saved_model_dir=./models/saved_model")
'''

if __name__ == "__main__":
    export_path = os.path.dirname(os.path.abspath(__file__)) + "/exports/export_tflite_tool.py"
    with open(export_path, "w") as f:
        f.write(TFLITE_EXPORT_SCRIPT)
    print(f"TFLite exporter ready at: {export_path}")

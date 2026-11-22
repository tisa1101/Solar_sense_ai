import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ["KERAS_BACKEND"] = "tensorflow"

try:
    import keras
    print("Keras version:", keras.__version__)
    from keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
    print("MobileNetV2 imported successfully!")
except Exception as e:
    print("Error:", e)

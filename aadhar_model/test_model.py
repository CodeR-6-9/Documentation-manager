import tensorflow as tf

print("✅ TensorFlow version:", tf.__version__)

# Try loading your model
try:
    model = tf.keras.models.load_model("aadhaar_model.keras")  # <-- change name if needed
    print("✅ Model loaded successfully!")
    print(model.summary())
except Exception as e:
    print("❌ Error loading model:", e)


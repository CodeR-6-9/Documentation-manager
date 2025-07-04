
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

model = load_model("model/aadhaar_model.keras")

img_file = [f for f in os.listdir("test") if f.endswith((".jpg", ".jpeg", ".png"))][0]
img_path = f"test/{img_file}"

img = image.load_img(img_path, target_size=(224, 224))
img_array = image.img_to_array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

prediction = model.predict(img_array)[0][0]
result = "✅ Aadhaar Document" if prediction > 0.5 else "❌ Not Aadhaar Document"

print(f"File: {img_file}")
print(f"Prediction Score: {prediction:.4f}")
print(f"Result: {result}")

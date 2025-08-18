from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np

# Create Flask app
app = Flask(__name__)

# Load your model
model = tf.keras.models.load_model("aadhaar_model.keras")

@app.route("/")
def home():
    return "✅ Aadhaar Model Flask API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get data from request
        data = request.get_json()

        # Convert input into numpy array (adjust preprocessing as per your training)
        input_data = np.array(data["input"]).reshape(1, -1)

        # Make prediction
        prediction = model.predict(input_data)

        # Return result as JSON
        return jsonify({"prediction": prediction.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

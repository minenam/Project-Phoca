import os
import sys

import boto3
import dotenv
import numpy as np
import PIL.Image as image
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from tensorflow.keras.applications import MobileNet
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.metrics import categorical_accuracy, top_k_categorical_accuracy, categorical_crossentropy
from tensorflow.keras.applications.mobilenet import preprocess_input

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"


app = Flask(__name__)
CORS(app)

dotenv.load_dotenv()

# Port num
PORT = os.getenv("PORT")

# AWS S3 setting
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION_NAME = os.getenv("AWS_REGION_NAME")
AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")
s3 = boto3.resource("s3",
                    aws_access_key_id=AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                    region_name=AWS_REGION_NAME)
BUCKET = s3.Bucket(AWS_BUCKET_NAME)


def s3_load_image(img_url):
  return BUCKET.Object(img_url).get()["Body"]


# Object Detection file path
OD_ROOT_PATH = "./object-detection"
OD_MODEL_PATH = os.path.join(OD_ROOT_PATH, "saved_model")
LABEL_FILE_PATH = os.path.join("data", os.getenv("LABEL_FILE_NAME"))
OD_CLASS_NAME_PATH = os.path.join(OD_ROOT_PATH, LABEL_FILE_PATH)

# Image Classification file path
IC_ROOT_PATH = "./image-classification"
IC_LABEL_FILE_PATH = os.path.join("data", os.getenv("IC_LABEL_FILE_NAME"))
IC_CLASS_NAME_PATH = os.path.join(IC_ROOT_PATH, IC_LABEL_FILE_PATH)


# Object Detection transform image
def transform_images(img, size):
  img = image.open(img)
  img = tf.expand_dims(img, 0)
  img = tf.image.resize(img, (size, size))
  img = img / 255
  return img


# Image Classification transform image
def ic_transform_images(img, size):
  img = image.open(img).convert("RGB")
  img = np.invert(img)
  img = tf.image.rgb_to_grayscale(img)
  img = tf.expand_dims(img, 0)
  img = tf.image.resize(img, (size, size))
  img = preprocess_input(img)
  return img


# Object Detection Model API
@app.route("/od/", methods=["GET"])
def predict():
  img_url = request.args.get("img")
  outputs = "please input image url"
  if img_url != None:
    img_url = img_url.split("?")[0]
    img = s3_load_image(img_url)
    img = transform_images(img, 416)
    infer = od_model.signatures[tf.saved_model.DEFAULT_SERVING_SIGNATURE_DEF_KEY]
    outputs = infer(img)
    boxes, scores, classes, nums = outputs["yolo_nms"], outputs[
      "yolo_nms_1"], outputs["yolo_nms_2"], outputs["yolo_nms_3"]
    detected_num = nums.numpy()[0]
    boxes, scores, classes, nums = boxes.numpy()[0][:detected_num].tolist(), \
      scores.numpy()[0][:detected_num].tolist(), \
      classes.numpy()[0][:detected_num].tolist(), \
      int(nums.numpy()[0])
    class_names = [c.strip() for c in open(OD_CLASS_NAME_PATH).readlines()]
    classes = [class_names[i] for i in classes]
    outputs = {"nums": nums, "boxes": boxes,
              "scores": scores, "classes": classes}
  return jsonify(outputs)


# Image Classification model Api
@app.route("/ic/", methods=["POST"])
def image_predict():
  outputs = "please input image url"
  if request.method == 'POST':
    file = request.files['image']
    answer = request.form["answer"]
    img = ic_transform_images(file, 64)
    res = ic_model.predict([img])
    label = np.argsort(-res, axis=1)[:,0:1]
    class_names = [c.strip() for c in open(IC_CLASS_NAME_PATH).readlines()]
    result = True if class_names[label[0][0]] == answer else False
    outputs = {
      "predicted": class_names[label[0][0]],
      "answer": answer,
      "result": result
    }
  return jsonify(outputs)


if __name__ == "__main__":
  od_model = tf.saved_model.load(OD_MODEL_PATH)
  ic_model = MobileNet(input_shape=(64, 64, 1), alpha=1., weights=None, classes=340)
  ic_model.load_weights("./image-classification/saved_model/image_model.h5")
  app.run(host="0.0.0.0", port=PORT, debug=True)

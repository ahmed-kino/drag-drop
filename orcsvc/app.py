#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request, make_response, jsonify

from readmrz import MrzDetector, MrzReader
import os

UPLOAD_FOLDER = './uploads'

app = Flask(__name__)


@app.route('/process', methods=['POST'])
def process():

    imagefile = request.files.get('imagefile', None)
    if not imagefile:
        return make_response("Missing file parameter", 400)

    # this should send the image to s3 bucket for example
    full_path = os.path.join(UPLOAD_FOLDER, imagefile.filename)
    imagefile.save(full_path) 

    try:
        detector = MrzDetector()
        reader = MrzReader()

        image = detector.read(full_path)
        cropped = detector.crop_area(image)
        result = reader.process(cropped)
    
        return jsonify(result)
    except Exception as e:
        return make_response(f'Internal Error: {e}', 500)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)

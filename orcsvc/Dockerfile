FROM python:3.11.5-bullseye

RUN apt-get update && apt-get install -y make

RUN apt-get install -y build-essential
RUN apt-get install -y libglvnd-dev

RUN apt-get install -y liblapack-dev libffi-dev
# Install tesseract-ocr and tesseract-ocr-fra
RUN apt-get install -y tesseract-ocr
RUN apt-get install -y tesseract-ocr-fra

# Install libsm6 and libxext6
RUN apt-get install -y libsm6 libxext6 libxrender-dev

ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY . /code/

RUN mkdir /uploads

RUN pip install --upgrade pip

RUN pip install -r requirements.txt
CMD ["python", "app.py"]

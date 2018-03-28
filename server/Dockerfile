FROM python:3

ENV PYTHONUNBUFFERED 1
RUN mkdir /usr/src/webapp

WORKDIR /usr/src/webapp



COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

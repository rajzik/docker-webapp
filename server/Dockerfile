FROM python:3

ENV PYTHONUNBUFFERED 1
RUN mkdir /usr/src/webapp

WORKDIR /usr/src/webapp

RUN pip install --upgrade pip


COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .


CMD ["python3","manage.py","runserver", "0.0.0.0:5555"]
FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/backend

RUN python3 -m venv venv
RUN /bin/bash -c "source venv/bin/activate"

RUN pip install --upgrade pip


COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

RUN python3 /usr/src/backend/manage.py migrate


CMD ["python3", "/usr/src/backend/manage.py", "runserver", "0.0.0.0:5555"]
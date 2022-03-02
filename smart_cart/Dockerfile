FROM python:3.8.8-slim 

COPY ./requirements.txt /app/requirements.txt

RUN pip install -r /app/requirements.txt

EXPOSE 9002

COPY . /app

WORKDIR /app

CMD ["python", "app/main.py"]


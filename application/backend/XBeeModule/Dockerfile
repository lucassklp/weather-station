FROM python:3.9.12-buster

RUN pip install digi-xbee

WORKDIR /app
COPY xbee.py .
ENTRYPOINT [ "python", "xbee.py" ]
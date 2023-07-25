FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu
ARG DEVIAN_FRONTEND=noninteractive
COPY requirements.txt /app/

RUN apt update && \
  apt install -y git python3 python3-pip python-is-python3 vim
RUN pip install -r /app/requirements.txt
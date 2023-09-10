FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu
ARG DEBIAN_FRONTEND=noninteractive

COPY requirements.txt /app/
RUN apt update
RUN apt -y install git python3 python3-pip python-is-python3 vim
RUN pip3 install -r /app/requirements.txt

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
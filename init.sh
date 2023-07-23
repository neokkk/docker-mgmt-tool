#!/bin/bash

export DEBIAN_FRONTEND=noninteractive

sudo apt update
sudo apt install -y ca-certificates apt-transport-https \
  software-properties-common libnss-mdns curl wget \
  python3-pip python-is-python3

# install docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(lsb_release -cs)" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y 

sudo usermod -aG docker $USER

mkdir $HOME/.docker

sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
sudo chmod g+rwx "$HOME/.docker" -R

sudo systemctl enable docker.service
sudo systemctl enable containerd.service

# install ansible
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install -y ansible
sudo pip3 install docker
sudo ansible-galaxy collection install community.docker

# for ansible
cd .ssh
cat id_rsa.pub >> authorized_keys
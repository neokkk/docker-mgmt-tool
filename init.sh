#!/bin/bash

export DEBIAN_FRONTEND=noninteractive

USER=vagrant
HOME=/home/$USER

sudo apt update
sudo apt install -y curl ca-certificates apt-transport-https

# install docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(lsb_release -cs)" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo usermod -aG docker $USER

mkdir $HOME/.docker

sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
sudo chmod g+rwx "$HOME/.docker" -R

sudo systemctl enable docker
sudo systemctl enable containerd

# install ansible
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install -y ansible
sudo pip3 install docker
sudo ansible-galaxy collection install community.docker

#!/bin/bash

cd ~/.ssh
mv /vagrant/vagrant id_rsa
cat id_rsa.pub >> known_hosts
ssh-keyscan -t rsa -H pod-1.local >> known_hosts

cd ~
mkdir ansible
cp -r /vagrant/* ansible/

cd ansible
ansible-playbook -i inventory.ini playbook.yml
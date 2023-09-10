nodes = ["dev", "test"]
base_ip_num = 10

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"

  config.vm.provider "virtualbox" do |vb|
    vb.cpus = 2
    vb.memory = 2048
  end

  config.vm.synced_folder ".", "/vagrant", type: "rsync", rsync__exclude: [".git/"], owner: "vagrant", group: "vagrant"

  nodes.each_with_index do |node, i|
    config.vm.define "#{node}" do |n|
      n.vm.hostname = "#{node}.local"
      n.vm.network "private_network", ip: "192.168.39.#{base_ip_num + i}"
    end
  end

  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    cp /vagrant/vm_rsa ~/.ssh/id_rsa
    cp /vagrant/vm_rsa.pub ~/.ssh/id_rsa.pub
    cat /vagrant/vm_rsa.pub >> ~/.ssh/authorized_keys
  SHELL
end
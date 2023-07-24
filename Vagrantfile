Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"

  config.vm.provider "virtualbox" do |vb|
    vb.cpus = 2
    vb.memory = 2048
  end

  config.vm.synced_folder ".", "/vagrant", type: "rsync", rsync__exclude: [".git/"]

  config.vm.define "dev" do |dev|
    dev.vm.hostname = "dev.local"
    dev.vm.network "private_network", ip: "192.168.36.1"
  end
end

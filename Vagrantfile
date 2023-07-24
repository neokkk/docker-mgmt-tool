VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.provider "virtualbox" do |vb|
        vb.memory = 1024
  end
  config.vm.synced_folder ".", "/vagrant", type: "rsync", rsync__exclude: [".git/"]

  #config.vm.hostname = "practice.local"
  #config.vm.network "private_network", ip: "192.168.35.11"
  config.vm.define "dev" do |dev|
    dev.vm.hostname = "dev.local"
    dev.vm.network "private_network", ip: "192.168.36.11"
  end
  # config.vm.define "test" do |test|
  #   test.vm.hostname = "test.local"
  #   test.vm.network "private_network", ip: "192.168.36.12"
  # end
end
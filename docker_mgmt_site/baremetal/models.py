from django.db import IntegrityError, models
import docker_mgmt.remotes.ansible as ansible
import docker_mgmt.remotes.setup as setup
from typing import Iterable, Union

class AnsibleRole(models.Model, ansible.Role):
  name = models.CharField(max_length=200)
  path = models.CharField(max_length=250, unique=True)
  description = models.TextField(null=True, blank=True)
  
  def __str__(self) -> str:
    return self.name

class Server(models.Model, setup.Server):
  hostname = models.CharField(max_length=200)
  ip_address = models.CharField(max_length=200)
  cpu = models.JSONField(null=True, blank=True)
  memory_total = models.IntegerField(null=True, blank=True)
  disks = models.JSONField(null=True, blank=True)
  labels = models.CharField(max_length=200, default="")
  roles = models.ManyToManyField("AnsibleRole", null=True, blank=True)
    
  def __str__(self) -> str:
    return f"{self.hostname}@{self.ip_address}"
  
  def save(self, *args, **kwargs) -> None:
    is_created = not self.pk
    if is_created:
      if not setup.test_connect(self.ip_address): # vm_rsa가 키로 등록된 서버
        raise IntegrityError("Could not connect to server: " + self.ip_address)
    
      server = setup.get_server_info()
      if server is None:
        raise IntegrityError("Could not get server info")
      
      setup.set_dns_hostname(server)
    
    for info in ["memory_total"]:
        setattr(self, info, getattr(server, info))

    self.cpu = server.cpu.to_dict()
    self.disks = [disk.to_dict() for disk in server.disks]
    
    super().save(*args, **kwargs)
  
  def provision(self):
    groupname = "managed"
    inventory_path = ansible.create_inventory(self, groupname)
    ansible.run_playbook(inventory_path, groupname, self.roles)
  
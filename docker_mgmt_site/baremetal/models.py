from django.db import IntegrityError, models
import docker_mgmt.remotes.ansible as ansible
import docker_mgmt.remotes.setup as setup
from celery import shared_task

class AnsibleRole(models.Model, ansible.Role):
  name = models.CharField(max_length=200, unique=True)
  path = models.CharField(max_length=250)
  description = models.TextField(null=True, blank=True)
  
  def __str__(self) -> str:
    return self.name

class Server(models.Model, setup.Server):
  name = models.CharField(max_length=200, unique=True, help_text="alias로 사용할 서버 이름")
  ip_address = models.CharField(max_length=200, unique=True, help_text="서버의 IP 주소 혹은 도메인 이름")
  cpu = models.JSONField(null=True, blank=True, help_text="CPU 정보")
  memory_total = models.IntegerField(null=True, blank=True, help_text="총 메모리 용량 (B)")
  disks = models.JSONField(null=True, blank=True, help_text="디스크 정보 (dev: 디바이스, size: 크기(B), used: 사용량(B))")
  labels = models.CharField(max_length=200, default="", help_text="레이블")
  roles = models.ManyToManyField("AnsibleRole", null=True, blank=True)
    
  def __str__(self) -> str:
    return f"{self.name} - {self.ip_address}"
  
  def save(self, *args, **kwargs) -> None:
    is_created = not self.pk
    if is_created:
      if not setup.test_connect(self.ip_address): # vm_rsa가 키로 등록된 서버
        raise IntegrityError("Could not connect to server: " + self.ip_address)
    
      server = setup.get_server_info()
      if server is None:
        raise IntegrityError("Could not get server info")

      server.name = self.name
      setup.set_dns_host(server)
    
      for info in ["memory_total"]:
        setattr(self, info, getattr(server, info))

      self.cpu = server.cpu.to_dict()
      self.disks = [disk.to_dict() for disk in server.disks]
    
    super().save(*args, **kwargs)

  def delete(self, *args, **kwargs) -> None:
    # setup.unset_dns_host(self)
    super().delete(*args, **kwargs)
    
  def provision(self):
    provision.delay(self.pk)

@shared_task  
def provision(pk):
  groupname = "managed"
  server = Server.objects.get(pk=pk)
  roles = [role for role in server.roles.all()]
  inventory_path = ansible.create_inventory(server, groupname)
  ansible.run_playbook(inventory_path, groupname, roles)

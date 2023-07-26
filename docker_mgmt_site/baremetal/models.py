from django.db import IntegrityError, models
import docker_mgmt.remotes.ansible as ansible
import docker_mgmt.remotes.setup as setup

class AnsibleRole(models.Model, ansible.Role):
  name = models.CharField(max_length=200)
  path = models.CharField(max_length=250, unique=True)
  description = models.TextField(null=True, blank=True)
  
  def __str__(self) -> str:
    return self.name

class Server(models.Model, setup.Server):
  hostname = models.CharField(max_length=200, unique=True, help_text='alias로 사용할 서버 이름')
  ip_address = models.CharField(max_length=200, help_text='서버의 IP 주소 혹은 도메인 이름')
  cpu = models.JSONField(null=True, blank=True, help_text='CPU 정보')
  memory_total = models.IntegerField(null=True, blank=True, help_text='총 메모리 용량 (KB)')
  disks = models.JSONField(null=True, blank=True, help_text='디스크 정보')
  labels = models.CharField(max_length=200, default='')
  roles = models.ManyToManyField('AnsibleRole', null=True, blank=True)
    
  def __str__(self) -> str:
    return f'{self.hostname} - {self.ip_address}'
  
  def save(self, *args, **kwargs) -> None:
    is_created = not self.pk
    if is_created:
      if not setup.test_connect(self.ip_address): # vm_rsa가 키로 등록된 서버
        raise IntegrityError('Could not connect to server: ' + self.ip_address)
    
      server = setup.get_server_info()
      if server is None:
        raise IntegrityError('Could not get server info')

      server.hostname = self.hostname
      setup.set_dns_hostname(server)
    
    for info in ['memory_total']:
      setattr(self, info, getattr(server, info))

    self.cpu = server.cpu.to_dict()
    self.disks = [disk.to_dict() for disk in server.disks]
    
    super().save(*args, **kwargs)
    
    if is_created and self.roles.exists():
      self.provision()

  def delete(self, *args, **kwargs) -> None:
    # setup.unset_dns_host(self)
    super().delete(*args, **kwargs)
  
  def provision(self):
    groupname = 'managed'
    inventory_path = ansible.create_inventory(self, groupname)
    ansible.run_playbook(inventory_path, groupname, self.roles)

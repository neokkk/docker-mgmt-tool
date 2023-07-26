from django.core.serializers.json import DjangoJSONEncoder
import json
from os import path
import paramiko
import subprocess
import sys
from typing import List, Optional

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.load_system_host_keys()

class CPU:
  core: int
  clock: float
  vendor: str
  model: str
  
  def __str__(self):
    return json.dumps(self, cls=DjangoJSONEncoder)

  def to_dict(self):
    return dict({
      "core": self.core,
      "clock": self.clock,
      "vendor": self.vendor,
      "model": self.model,
    })
    
class Disk:
  dev: str
  size: int # bytes
  used: int
  
  def __str__(self):
    return json.dumps(self, cls=DjangoJSONEncoder)
  
  def __init__(self, dev: str, size: int, used: int=0):
    self.dev = dev
    self.size = size
    self.used = used
    
  def to_dict(self):
    return dict({
      "dev": self.dev,
      "size": self.size,
      "used": self.used,
    })
    
class Server:
  hostname: str
  ip_address: str
  cpu: CPU
  memory_total: int # kb
  disks: Optional[List[Disk]]
  
  def __str__(self):
    return json.dumps(self, cls=DjangoJSONEncoder)

def default_process(line: str) -> str:
  return line

def ssh_exec(client: paramiko.SSHClient, cmd: str, process=default_process) -> Optional[List[str]]:
  _, stdout, stderr = client.exec_command(cmd)
  if stderr.channel.recv_exit_status() != 0:
    return None
  lines = stdout.readlines()
  return [process(line.encode().decode("utf-8").strip()) for line in lines]

def test_connect(ip_address: str, username="vagrant") -> bool: 
  try:
    client.connect(ip_address,
                   username=username,
                   key_filename=path.abspath(path.join(path.dirname(path.abspath(__file__)), '../../vm_rsa')),
                   timeout=3000,
                   allow_agent=False)
    if client is None:
      raise Exception("Could not connect to server: " + ip_address)
    return True
  except Exception as e:
    print(f"Error: {e}")
    client.close()
    return False

def get_server_info() -> Server:
  cpu = CPU()
  server = Server()
  cpu_infos = [
    ["core", "cat /proc/cpuinfo | grep 'processor' | wc -l", lambda line: int(line)],
    ["vendor", "cat /proc/cpuinfo | grep 'vendor_id' | uniq | awk '{ print $3 }'", default_process],
    ["model", "cat /proc/cpuinfo | grep 'model name' | uniq | awk '{ for (i=4;i<=NF;i++) printf $i (i==NF ? \"\" : \" \") }'", default_process],
    ["clock", "cat /proc/cpuinfo | grep 'cpu MHz' | uniq | awk '{ print $4 }'", lambda line: float(line)],
  ]
  server_infos = [
    ["hostname", "hostname -f", default_process],
    ["ip_address", "hostname -I | awk '{ for (i=1; i<=NF; i++) { split($i, arr, \".\"); if (arr[1] >= 192 && arr[1] < 255) print $i } }'", default_process],
    ["memory_total", "cat /proc/meminfo | grep 'MemTotal' | awk '{ print $2 }'", lambda line: int(line)],
    ["disks", "lsblk -b | awk '/disk/ { print $1 \" \" $4 }'", lambda line: Disk(line.split(" ")[0], int(line.split(" ")[1]))]]
  
  for info in cpu_infos:
    setattr(cpu, info[0], ssh_exec(client, *info[1:])[0])
  
  for info in server_infos:
    if info[0] == "disks":
      setattr(server, info[0], ssh_exec(client, *info[1:]))
    else:
      setattr(server, info[0], ssh_exec(client, *info[1:])[0])

  server.cpu = cpu
  return server

def set_dns_hostname(server: Server):
  subprocess.run(f"echo '{server.ip_address}\t{server.hostname}' | sudo tee -a /etc/hosts", shell=True)
  
def copy_ssh_key(server: Server, username: str, key: str):
  subprocess.run(f"ssh-copy-id -i {key} {username}@{server.ip_address}", shell=True)

def run(hostname: str) -> Optional[Server]:
  if test_connect(hostname) is False:
    print("Could not connect to host: " + hostname)
    sys.exit(1)

  server = get_server_info()
  if server is None:
    print("Could not get remote info")
    client.close()
    sys.exit(1)
    
  set_dns_hostname(server)
  
  return server
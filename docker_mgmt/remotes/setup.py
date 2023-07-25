import json
from os import path
import paramiko
import subprocess
import sys
from typing import List, Optional

client = paramiko.SSHClient()

class Disk:
  dev: str
  size: int # bytes
  allocated: int
  
  def __init__(self, dev: str, size: int, allocated: int=0):
    self.dev = dev
    self.size = size
    self.used = used
    
class Server:
  hostname: str
  ip_address: str
  cpu_cores: int
  cpu_vendor: str
  cpu_model: str
  cpu_clocks: str
  memory_total: int # bytes
  disks: Optional[List[Disk]]

def default_process(line: str) -> str:
  return line

def ssh_exec(client: paramiko.SSHClient, cmd: str, process=default_process) -> Optional[List[str]]:
  stdin, stdout, stderr = client.exec_command(cmd)
  if stderr.channel.recv_exit_status() != 0:
    return None
  lines = stdout.readlines()
  return [process(line.encode().decode("utf-8").strip()) for line in lines]

def test_connect(server: str) -> bool: 
  try:
    client.connect(server,
                   username="vagrant",
                   key_filename=path.abspath(path.join(path.dirname(path.abspath(__file__)), '../../vm_rsa')),
                   allow_agent=False)
    if client is None:
      raise Exception("Could not connect to server: " + server)
    return True
  except Exception as e:
    print(f"Error: {e}")
    return False

def get_remote_info() -> Server:
  server = Server()
  infos = [
    ["hostname", "hostname -f"],
    ["ip_address", "hostname -I | awk '{ for (i=1; i<=NF; i++) { split($i, arr, \".\"); if (arr[1] >= 192 && arr[1] < 255) print $i } }'"],
    ["cpu_cores", "cat /proc/cpuinfo | grep 'processor' | wc -l", lambda line: int(line)],
    ["cpu_vendor", "cat /proc/cpuinfo | grep 'vendor_id' | uniq | awk '{ print $3 }'"],
    ["cpu_model", "cat /proc/cpuinfo | grep 'model name' | uniq | awk '{ for (i=4;i<=NF;i++) printf $i (i==NF ? \"\" : \" \") }'"],
    ["cpu_clocks", "cat /proc/cpuinfo | grep 'cpu MHz' | uniq | awk '{ print $4 }'", lambda line: float(line)],
    ["memory_total", "cat /proc/meminfo | grep 'MemTotal' | awk '{ print $2 }'", lambda line: int(line) * 1024],
    ["disks", "lsblk -b | awk '/disk/ { print $1 \" \" $4 }'", lambda line: Disk(line.split(" ")[0], int(line.split(" ")[1]))]]
  
  for info in infos:
    if info[0] == "disks":
      setattr(server, info[0], ssh_exec(client, info[1]))
    else:
      setattr(server, info[0], ssh_exec(client, info[1])[0])

  print(json.dumps(server.__dict__))
  return server

def set_dns_hostname(hostname: str, server: Server):
  subprocess.run(f"echo '{server.ip_address}\t{hostname}' | sudo tee -a /etc/hosts", shell=True)
  
def copy_ssh_key(server: Server, username: str, key: str):
  subprocess.run(f"ssh-copy-id -i {key} {username}@{server.ip_address}", shell=True)

def run(hostname: str) -> Optional[Server]:
  client.load_system_host_keys()
  
  if test_connect(hostname) is False:
    print("Could not connect to host: " + hostname)
    sys.exit(1)

  server = get_remote_info()
  if server is None:
    print("Could not get remote info")
    client.close()
    sys.exit(1)
    
  set_dns_hostname(server.hostname, server)
  
  return server

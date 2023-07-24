from typing import List, Optional

class Disk:
  dev: str # sda | sdb ...
  size: int # bytes
  allocated: int
  
  def __init__(self, dev: str, size: int, allocated: int=0):
    self.dev = dev
    self.size = size
    self.allocated = allocated
    
class Server:
  hostname: str
  ip_address: str
  cores: int
  cpu_vendor: str
  cpu_model: str
  cpu_clocks: str
  memory_total: int # bytes
  disks: Optional[List[Disk]]
  
  def __init__(self, hostname: str, ip_address: str):
    self.hostname = hostname
    self.ip_address = ip_address
    
def test_connect(ip: str, username: str=None, password: str=None) -> Optional[Server]:
  pass
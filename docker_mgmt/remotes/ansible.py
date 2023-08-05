from os import environ
import subprocess
from typing import List, Union
from .setup import Server

class Role:
  name: str
  path: str
  description: str
  
  def __str__(self):
    return f"Role(name={self.name}, path={self.path}, description={self.description})"

def create_inventory(server: Union[List[Server], Server], groupname="managed") -> str:
  inventory_file = "/tmp/inventory"
  
  with open(inventory_file, "w") as f:
    if isinstance(server, list):
      names = [s.name for s in server]
    else:
      names = [server.name]

    print(f"[{groupname}]", file=f)
    for name in names:
      print(name, file=f)
    
  return inventory_file

def run_playbook(inventory_file: str, groupname: str, roles: List[Role]) -> bool:
  playbook_file = "/tmp/playbook.yml"
  
  if len(roles) == 0: return False
  
  try:
    with open(playbook_file, "w") as f:
      print(f"- hosts: {groupname}", file=f)
      print("  become: true", file=f)
      print("  roles:", file=f)
      for role in roles:
        print(f"    - {role.path}", file=f)
  except:
    return False
  
  try:
    print("run playbook!")
    environ["ANSIBLE_CONFIG"] = "/workspace/ansible.cfg"
    subprocess.run(f"ansible-playbook -i {inventory_file} {playbook_file} -e network={groupname} -u vagrant -vvv", shell=True)
    return True
  except:
    return False

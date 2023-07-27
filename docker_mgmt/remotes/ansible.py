import subprocess
from typing import List, Union
from .setup import Server

class Role:
  name: str
  path: str
  description: str
  
def create_inventory(server: Union[List[Server], Server], group="managed") -> str:
  path = "/tmp/inventory"
  
  with open(path, "w") as f:
    if isinstance(server, list):
      names = [s.name for s in server]
    else:
      names = [server.name]

    f.write(f"[{group}]\n")
    f.write('\n'.join(names))
    f.write('\n')
    
  return path

def run_playbook(inventory_path: str, group: str, roles: List[Role]) -> bool:
  playbook_path = "/tmp/playbook.yml"
  
  try:
    with open(playbook_path, "w") as f:
      f.writelines([
        f"- hosts: {group}",
        f"  become: yes",
        f"  roles:",
      ] + [
        f"    - {role.path}" for role in roles
      ])
      f.write(f"\n")
  except:
    return False
  
  try:
    print("run playbook!")
    subprocess.run(f"ansible-playbook -i {inventory_path} {playbook_path}", shell=True)
    return True
  except:
    return False

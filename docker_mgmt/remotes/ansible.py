import subprocess
from typing import List, Union
from .setup import Server

def create_inventory(server: Union[List[Server], Server], group="managed") -> str:
  print(server)
  print(group)
  path = "/tmp/inventory"
  
  with open(path, "w") as f:
    if isinstance(server, list):
      hostnames = [s.hostname for s in server]
    else:
      hostnames = [server.hostname]

    f.write(f"[{group}]\n")
    f.write('\n'.join(hostnames))
    f.write('\n')
    
  return path

def run_playbook(workdir: str, group: str, roles: List[str]) -> bool:
  playbook_path = "/tmp/playbook.yml"
  
  try:
    with open(playbook_path, "w") as f:
      f.writelines([
        f"- hosts: {group}",
        f"  become: yes",
        f"  roles:",
      ] + [
        f"    - {role}" for role in roles
      ])
      f.write(f"\n")
  except:
    return False
  
  try:
    # subprocess.run(f"ansible-playbook -i {create_inventory(group)} {playbook_path}", cwd=workdir)
    return True
  except:
    return False

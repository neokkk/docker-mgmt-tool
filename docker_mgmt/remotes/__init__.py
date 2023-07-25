from .ansible import run_playbook, create_inventory
from .setup import run

server = run("192.168.39.10")
inventory = create_inventory(server)
# run_playbook(inventory, "managed", ["common", "docker"])
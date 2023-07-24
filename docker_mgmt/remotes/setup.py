from typing import List, Optional

class Disk:
    dev: str    # sda | sdb | ...
    size: int   # bytes
    # 어떤 정보를 더 추가하는 것이
    # 관리에 용이한가?
    allocated: int # bytes

    def __init__(self, dev:str, size:int, allocated:int=0):
        self.dev = dev
        self.size = size
        self.allocated = allocated

class Server:
    hostname: str       #
    ip_address: str     # /etc/hosts 등록 가능
    number_of_cores: int # 코어 수
    cpu_vendor: str     # CPU제조사
    cpu_model: str      # CPU 제품(모델)
    cpu_clocks: str     # CPU 성능 (MHz, GHz)
    memory_totals: int  # bytes
    disks: Optional[List[Disk]]

    #def __init__(self, ...)

def test_connect(ip: str, username: str=None, password: str=None) -> Optional[Server]:
    # TODO
    # 1. connect to remote({ip}) server with ssh
    #   - a. invoke ssh command 
    #   - b. use ssh library such as paramiko
    #   - c. use framework such as fabric, puppet, chef-solo
    # 2. collect required infomation
    #   - Server 객체 만들 수 있는 것.
    #     - hostname --> hostname 명령 in remote
    #       - hostnamectl get-hostname (systemd)
    #     - ip address --> ip addr 명령 in remote
    #     - cpu 정보 --> /proc/cpuinfo
    #     - Memory 정보 --> /proc/meminfo
    #     - Disk 정보 --> lsblk 명령 in remote


    server = Server()
    server.hostname = "dev.local"
    server.ip_address = "192.168.36.11"
    server.number_of_cores = 12
    # ...

    #현재 머신 (Dev컨테이너)의 /etc/hosts 에 발견한 정보 추가

    return server

def copy_id(server: Server, username=None, password=None) -> bool:
    # 관리하고 있는 인증키의 공개키를 발견한 server에 등록
    # ssh-copy-id 가 하는 일 처리
    
    # 전제 username 은 sudo 를 사용해서 root 가 될 수 있어야 합니다.
    # 대상은 root 계정, /root/.ssh/authorized_keys
    pass
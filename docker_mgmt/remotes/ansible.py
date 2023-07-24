from typing import List, Union
from .setup import Server


def create_inventory(server: Union[List[Server], Server]) -> str:
    # server 객체를 보고
    # ansible 인벤토리를 구성한 임시 파일 생성기
    # return --> 임시 파일 위치(파일 경로 문자열)
    pass

def run_playbook(inven: str, roles: List[str]) -> bool:
    # Role 을 가지고
    # playbook.yml

    # hosts: MANAGED
    # become: true
    # tasks:
    # - ROLE... [ roles 로 부터 생성]

    # 임시 파일 playbook.yml 만들기 (/tmp//)

    # ansible-playbook -i {inven} {playbook}
    # return 성공/실패 --> true/false


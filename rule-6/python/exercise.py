from dataclasses import dataclass
from typing import List, Optional

@dataclass
class User:
    id: str
    em: str
    addr: str

class UsrMgr:
    def __init__(self):
        self.usrs: List[User] = []

    def add_usr(self, usr: User) -> None:
        if self.find_usr_by_em(usr.em):
            raise Exception('Usr with em exists')
        self.usrs.append(usr)

    def find_usr_by_em(self, em: str) -> Optional[User]:
        for u in self.usrs:
            if u.em == em:
                return u
        return None

    def updt_usr_addr(self, usr_id: str, addr: str) -> None:
        usr = self.find_usr_by_id(usr_id)
        if usr:
            usr.addr = addr
            self.save_usrs()

    def find_usr_by_id(self, id: str) -> Optional[User]:
        for u in self.usrs:
            if u.id == id:
                return u
        return None

    def save_usrs(self) -> None:
        print('Saving usrs to db') 
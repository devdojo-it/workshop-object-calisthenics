<?php
class User {
    public function __construct(
        public string $id,
        public string $em,
        public string $addr
    ) {}
}

class UsrMgr {
    private array $usrs = [];

    public function addUsr(User $usr): void {
        if ($this->findUsrByEm($usr->em)) {
            throw new Exception('Usr with em exists');
        }
        $this->usrs[] = $usr;
    }

    public function findUsrByEm(string $em): ?User {
        foreach ($this->usrs as $u) {
            if ($u->em === $em) return $u;
        }
        return null;
    }

    public function updtUsrAddr(string $usrId, string $addr): void {
        $usr = $this->findUsrById($usrId);
        if ($usr) {
            $usr->addr = $addr;
            $this->saveUsrs();
        }
    }

    public function findUsrById(string $id): ?User {
        foreach ($this->usrs as $u) {
            if ($u->id === $id) return $u;
        }
        return null;
    }

    public function saveUsrs(): void {
        echo "Saving usrs to db\n";
    }
} 
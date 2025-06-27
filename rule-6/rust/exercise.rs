pub struct User {
    pub id: String,
    pub em: String,
    pub addr: String,
}

pub struct UsrMgr {
    usrs: Vec<User>,
}

impl UsrMgr {
    pub fn new() -> Self {
        UsrMgr { usrs: Vec::new() }
    }

    pub fn add_usr(&mut self, usr: User) {
        if self.find_usr_by_em(&usr.em).is_some() {
            panic!("Usr with em exists");
        }
        self.usrs.push(usr);
    }

    pub fn find_usr_by_em(&self, em: &str) -> Option<&User> {
        self.usrs.iter().find(|u| u.em == em)
    }

    pub fn updt_usr_addr(&mut self, usr_id: &str, addr: &str) {
        if let Some(usr) = self.find_usr_by_id_mut(usr_id) {
            usr.addr = addr.to_string();
            self.save_usrs();
        }
    }

    pub fn find_usr_by_id(&self, id: &str) -> Option<&User> {
        self.usrs.iter().find(|u| u.id == id)
    }

    fn find_usr_by_id_mut(&mut self, id: &str) -> Option<&mut User> {
        self.usrs.iter_mut().find(|u| u.id == id)
    }

    pub fn save_usrs(&self) {
        println!("Saving usrs to db");
    }
} 
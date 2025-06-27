#include <string>
#include <vector>
#include <stdexcept>
#include <iostream>

struct User {
    std::string id;
    std::string em;
    std::string addr;
};

class UsrMgr {
    std::vector<User> usrs;
public:
    void addUsr(const User& usr) {
        if (findUsrByEm(usr.em)) {
            throw std::runtime_error("Usr with em exists");
        }
        usrs.push_back(usr);
    }
    User* findUsrByEm(const std::string& em) {
        for (auto& u : usrs) {
            if (u.em == em) return &u;
        }
        return nullptr;
    }
    void updtUsrAddr(const std::string& usrId, const std::string& addr) {
        User* usr = findUsrById(usrId);
        if (usr) {
            usr->addr = addr;
            saveUsrs();
        }
    }
    User* findUsrById(const std::string& id) {
        for (auto& u : usrs) {
            if (u.id == id) return &u;
        }
        return nullptr;
    }
    void saveUsrs() {
        std::cout << "Saving usrs to db" << std::endl;
    }
}; 
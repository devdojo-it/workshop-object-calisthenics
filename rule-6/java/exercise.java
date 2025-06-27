import java.util.*;

class User {
    public String id;
    public String em;
    public String addr;
    public User(String id, String em, String addr) {
        this.id = id;
        this.em = em;
        this.addr = addr;
    }
}

public class UsrMgr {
    private List<User> usrs = new ArrayList<>();

    public void addUsr(User usr) {
        if (findUsrByEm(usr.em) != null) {
            throw new RuntimeException("Usr with em exists");
        }
        usrs.add(usr);
    }

    public User findUsrByEm(String em) {
        for (User u : usrs) {
            if (u.em.equals(em)) return u;
        }
        return null;
    }

    public void updtUsrAddr(String usrId, String addr) {
        User usr = findUsrById(usrId);
        if (usr != null) {
            usr.addr = addr;
            saveUsrs();
        }
    }

    public User findUsrById(String id) {
        for (User u : usrs) {
            if (u.id.equals(id)) return u;
        }
        return null;
    }

    public void saveUsrs() {
        System.out.println("Saving usrs to db");
    }
} 
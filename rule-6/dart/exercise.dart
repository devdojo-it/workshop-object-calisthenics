class User {
  String id;
  String em;
  String addr;
  User({required this.id, required this.em, required this.addr});
}

class UsrMgr {
  final List<User> usrs = [];

  void addUsr(User usr) {
    if (findUsrByEm(usr.em) != null) {
      throw Exception('Usr with em exists');
    }
    usrs.add(usr);
  }

  User? findUsrByEm(String em) {
    return usrs.firstWhere((u) => u.em == em, orElse: () => null);
  }

  void updtUsrAddr(String usrId, String addr) {
    final usr = findUsrById(usrId);
    if (usr != null) {
      usr.addr = addr;
      saveUsrs();
    }
  }

  User? findUsrById(String id) {
    return usrs.firstWhere((u) => u.id == id, orElse: () => null);
  }

  void saveUsrs() {
    print('Saving usrs to db');
  }
} 
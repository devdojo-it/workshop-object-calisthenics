package main

import "fmt"

type User struct {
	Id   string
	Em   string
	Addr string
}

type UsrMgr struct {
	Usrs []User
}

func (m *UsrMgr) AddUsr(usr User) {
	if m.FindUsrByEm(usr.Em) != nil {
		panic("Usr with em exists")
	}
	m.Usrs = append(m.Usrs, usr)
}

func (m *UsrMgr) FindUsrByEm(em string) *User {
	for i := range m.Usrs {
		if m.Usrs[i].Em == em {
			return &m.Usrs[i]
		}
	}
	return nil
}

func (m *UsrMgr) UpdtUsrAddr(usrId, addr string) {
	usr := m.FindUsrById(usrId)
	if usr != nil {
		usr.Addr = addr
		m.SaveUsrs()
	}
}

func (m *UsrMgr) FindUsrById(id string) *User {
	for i := range m.Usrs {
		if m.Usrs[i].Id == id {
			return &m.Usrs[i]
		}
	}
	return nil
}

func (m *UsrMgr) SaveUsrs() {
	fmt.Println("Saving usrs to db")
} 
import styled from "styled-components";


import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {HeaderMenuItem} from "./HeaderMenuItem";
import api from "../api";
import {UserContext} from "../user-content/UserContent";


export function HeaderMenu() {

    const { setIsLogin, currentUser, setCurrentUser } = useContext(UserContext)

   const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()


    function handleClick() {setIsOpen(!isOpen)}

    let menuRef = useRef()
    useEffect(() => {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handler)

      return() =>{
        document.removeEventListener("mousedown", handler);
      }
    })

    // =========== logout =================================
    function handleLogout() {
      api.post('/logout/', { refresh: localStorage.getItem("refresh") })
      .then((res) => {
        if (res.status === 200) {
            localStorage.clear();
            setIsLogin(false)
            setCurrentUser(null)
            navigate('/login', {replace: true})
        }})
      .catch((error) => {
        console.error("Error logging out:", error);
      });
    }

    return (
        <MenuContainer ref={menuRef}>
            <MenuTrigger onClick={handleClick} >
                <UserName>hellohellohello</UserName>
            </MenuTrigger>

            {isOpen && (
              <MenuDropdownList>
                <HeaderMenuItem
                  icon={""}
                  icon_info="aacount icon"
                  text="Account"
                  goTo="/account"
                />

                {/*{*/}
                {/*  (currentUser.user_id === 33 || currentUser.id === 1) && (*/}
                {/*    <HeaderMenu*/}
                {/*      icon={""}*/}
                {/*      icon_info="admin icon"*/}
                {/*      text="Admin"*/}
                {/*      // handleClick={handleLogout}*/}
                {/*      goTo="/admin/users"*/}
                {/*    />*/}
                {/*  )*/}
                {/*}*/}

                <HeaderMenuItem
                  icon={""}
                  icon_info="logout icon"
                  text="Log out"
                  handleClick={handleLogout}
                  goTo="javascript:void(0)"
                />
              </MenuDropdownList>
            )}
        </MenuContainer>
    )
}

const UserName = styled.div`
    height: 100%;
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
`

const MenuDropdownList = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 55px;
  right: 50px;
  background-color: #ced6e0;
  border-radius: 8px;
  //padding: 10px 0;
  // height: 250px;
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19) !important;

  &:before {
    content: "";
    position: absolute;
    top: -5px;
    right: 8px;
    height: 20px;
    width: 20px;
    background: var(--secondary-bg);
    transform: rotate(45deg);
  }
`

export const MenuTrigger = styled.div``

export const MenuContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {UserContext} from "../../user-content/UserContent";
import { SortOption} from "../homepage/ExploreMenu";

const AccessibilityOptions = ["Settings", "Log out"]
export function AccountAccessibility() {

    const [isOpenDropdown, setOpenDropDown] = useState(false)
    const { currentUser } = useContext(UserContext)
    const navigate = useNavigate()

    function handleClick() {
      setOpenDropDown(!isOpenDropdown)
    }

    let menuRef = useRef()
    useEffect(() => {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setOpenDropDown(false)
        }
      }
      document.addEventListener("mousedown", handler)

      return() =>{
        document.removeEventListener("mousedown", handler);
      }
    })

    // =========== logout =================================
    function handleLogout() {
      // apiFetch('/logout', {
      //   method: "DELETE"
      // })
      // .then((r) => {
      //   if (r.ok) {
      //     setUser(null);
      //     setArticles(null);
      //     setVocabularies(null);
      //     navigate('/login')
      //   }
      // })
      // .catch((error) => {
      //   console.error("Error logging out:", error);
      // });
    }

    return (
        <AccountAccessibilityContainer ref={menuRef} onClick={handleClick}>
            <MenuTrigger  >
                  <UserName>{currentUser?.username}</UserName>
            </MenuTrigger>

            {isOpenDropdown && (
                <AccessibilityOptionsContainer className="accessibility-options-container">
                    <OptionsWrapper className="options-wrapper">
                      {AccessibilityOptions.map((op, index) => (
                          <OptionItem
                              className="option-item"
                              key={index}
                              onClick={() => {}}
                          >
                              {op}
                          </OptionItem>
                      ))}
                    </OptionsWrapper>
                </AccessibilityOptionsContainer>
            )}
        </AccountAccessibilityContainer>
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
  color: #000000;
`

const AccessibilityOptionsContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 160px;
  top: 100%; 
  right: 1.5rem;
  background-color: #ffffff;
  color: #000000;
  border-radius: 8px;
  list-style-type: none;
`
const OptionsWrapper = styled.div`
  box-sizing: border-box;
`
const OptionItem = styled.div`
  padding: 1rem;
  &:hover {
    cursor: pointer;
    background-color: rgba(33, 33, 33, 0.2);
    color: rgba(0, 0, 0);
  }
`

export const FirstLetter = styled.div`
    height: 100%;
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  `
export const ProfileAvatar = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    transition: transform .2s;
    cursor: pointer;
    color: white;
    &:hover {
      transform: scale(1.2);
    }
`
export const MenuTrigger = styled.div``

export const AccountAccessibilityContainer = styled.div`
  background-color: #e3e3e3;
  border-radius: 45px;
  padding: 1rem 2rem;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(23,188,90, 1);
  }
`;

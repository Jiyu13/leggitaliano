import styled from "styled-components";
import menu_icon from "../../assets/icons/menu_24dp.svg";
import close_icon from "../../assets/icons/close_24dp.svg";


export default function MobileMenuBtn({isOpenMenu, handleOpenHeaderMenu}) {
    // isOpenHeader ? close_icon :
     return (
         <MobileMenuContainer onClick={handleOpenHeaderMenu}>
            <img
                src={isOpenMenu ? close_icon : menu_icon}
                alt="mobile menu hamburger"
            />
        </MobileMenuContainer>
     )

}

const MobileMenuContainer  = styled.div`
  width: 24px;
  height: 24px;
  padding: 0.5rem;
  border-radius: 45px;
  background-color: rgba(33, 33, 33, 1);
  cursor: pointer;
  position: fixed;
  right: 20px;
  top: 2rem;
  z-index: 2001;
  transform: translateY(0);
  transition: transform .35s cubic-bezier(.645, .045, .355, 1);
  transition-delay: .35s;
`